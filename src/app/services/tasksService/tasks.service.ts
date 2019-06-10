import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { ITasks } from '../../interfaces/ITasks';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasks: Observable<ITasks[]>;
  userId: string;

  private dateSubject = new BehaviorSubject<string>('date');
  currentDate = this.dateSubject.asObservable();
  constructor(private http: HttpClient, private firestore: AngularFirestore) {
    this.userId = JSON.parse(localStorage.getItem('currentUser')).uid;
  }

  updateDate(date: string) {
    this.dateSubject.next(date);
  }

  getDayTasks(dateUnformatted) {

    const dateArray = dateUnformatted.split('/');
    const monthNumber = parseInt(dateArray[1]) < 10 ? "0" + dateArray[1]: dateArray[1];
    let day = dateArray[0] < 10 ? "0" + dateArray[0]: dateArray[0];

    var dateFormatted = dateArray[2] + "-" + monthNumber + "-" + day + "T00:00:00";


    let startOfDay = new Date(dateFormatted);
    let endOfDay = new Date(dateFormatted);

    endOfDay.setDate(endOfDay.getDate() + 1);

    return this.firestore.collection<ITasks>('tasks', ref => ref
      .where('userId', '==', this.userId)
      .orderBy('date')
      .startAt(startOfDay)
      .endBefore(endOfDay)
    ).snapshotChanges();
  }


  getWeekTasks (datesUnformatted) {

    const dateQueries = datesUnformatted.map(dateItem => {
      let dateArray = dateItem.date.split("-");
      let day = dateArray[2] < 10 ? "0" + dateArray[2]: dateArray[2];
      let date = dateArray[0] + "-" + (parseInt(dateArray[1]) < 10 ? "0" + dateArray[1]: dateArray[1]) + "-" + day + "T00:00:00";
      return date
    });

    let startPeriod = new Date(dateQueries[0]);
    let endPeriod = new Date(dateQueries[6]);
    endPeriod.setDate(endPeriod.getDate() + 1);


    return this.firestore.collection<ITasks>('tasks', ref => ref
      .where('userId', '==', this.userId)
      .orderBy('date')
      .startAt(startPeriod)
      .endBefore(endPeriod)
    ).snapshotChanges()

  }

  saveTask (task) {
    let taskId = task.id;
    delete task.id;
    return this.firestore.collection('tasks')
      .doc(taskId)
      .set(task, { merge: true });
  }


  addTask (task) {
    return this.firestore.collection('tasks')
      .add(task);
  }

  deleteTask (taskId) {
    return this.firestore.collection('tasks')
      .doc(taskId)
      .delete();
  }

  changeTaskStatus (taskId, paused) {
    return this.firestore.collection('tasks')
      .doc(taskId)
      .set({stopped: paused}, { merge: true });
  }

  getMonthlyStats (monthStart, monthEnd) {
    return this.firestore.collection<ITasks>('tasks', ref => ref
      .orderBy('date')
      .startAt(monthStart)
      .endBefore(monthEnd)
    ).valueChanges()
  }

}
