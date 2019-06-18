import {EventEmitter, Injectable, Output} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { ITasks } from '../../interfaces/ITasks';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasks: Observable<ITasks[]>;
  userId: string;
  @Output() afterChange = new EventEmitter();

  private dateSubject = new BehaviorSubject<string>('date');
  currentDate = this.dateSubject.asObservable();
  constructor(private http: HttpClient, private firestore: AngularFirestore) {
  }

  updateDate(date: string) {
    this.dateSubject.next(date);
  }

  getDayTasks(dateUnformatted) {
    this.userId = JSON.parse(localStorage.getItem('currentUser')).uid;

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
    this.userId = JSON.parse(localStorage.getItem('currentUser')).uid;

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
    this.userId = JSON.parse(localStorage.getItem('currentUser')).uid;
    return this.firestore.collection<ITasks>('tasks', ref => ref
      .where('userId', '==', this.userId)
      .orderBy('date')
      .startAt(monthStart)
      .endBefore(monthEnd)
    ).valueChanges()
  }

  getDayMoney (url, day) {
    return this.http.get(url);
  }

  editExpense (expense, url) {

    return this.http.post(url, {expense: expense});
  }

  deleteExpense (expenseId, url) {

    const options = {
      params: new HttpParams().set('expenseId', expenseId)
    };

    return this.http.delete(url, options);
  }

  addExpense (url, expense) {
    return this.http.put(url, {expense: expense}).pipe(map(items => {
      this.afterChange.emit(expense);
    }));
  }

}
