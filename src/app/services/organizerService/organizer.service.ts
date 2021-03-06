import {EventEmitter, Injectable, Output} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { ITasks } from '../../interfaces/ITasks';
import {catchError, map} from 'rxjs/operators';
import {AppConstants} from '../../app-constants.enum';

@Injectable({
  providedIn: 'root'
})
export class OrganizerService {
  tasks: Observable<ITasks[]>;
  userId: string;
  @Output() afterChange = new EventEmitter();
  @Output() afterExpensesLoaded = new EventEmitter();

  todayDate = new Date();
  currentDayNumber: number = this.todayDate.getDate();
  currentDayString: string = this.currentDayNumber < 10 ? "0" + this.currentDayNumber: this.currentDayNumber.toString();
  currentMonth: string = (this.todayDate.getMonth() + 1).toString();
  currentYear: number = this.todayDate.getFullYear();
  expenseUrl = AppConstants.expensesAPI;
  settingsUrl = AppConstants.expensesSettingsAPI;

  private dateSubject = new BehaviorSubject<string>(this.currentDayNumber + '/' + this.currentMonth + "/" + this.currentYear);
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
      let dateArray = dateItem.date.split("/");
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

  getDayExpenses (date) {
    const timestamp = this.getTimestamp(date);

    let monthStartPart = date.split("/");
    let monthStart = "01/" + monthStartPart[1] + "/" + monthStartPart[2];
    let monthStartTimestamp = this.getTimestamp(monthStart);

    let numberOfDays = new Date(monthStartPart[2], monthStartPart[1], 0).getDate();
    let monthEnd = numberOfDays + "/" + monthStartPart[1] + "/" + monthStartPart[2];
    let monthEndTimestamp = this.getTimestamp(monthEnd);

    const options = {
      params: new HttpParams()
        .set('date', String(timestamp))
        .append('monthStart',  String(monthStartTimestamp))
        .append('monthEnd', String(monthEndTimestamp)),
    };

    return this.http.get(this.expenseUrl, options)
      .pipe(map((result) => {
          // @ts-ignore
          this.afterExpensesLoaded.emit(result.expensesByCategory);

          return result;
        }),
        catchError((error: any) => {
          throw error;
        }));

  }

  getWeekExpenses (dates) {
    const timestamps = [];

    for(let index = 0; index < dates.length; index++){
      const currentItemDate = this.getTimestamp(dates[index].date);
      timestamps.push(currentItemDate);
    }

    const options = {
      // @ts-ignore
      params: new HttpParams().set('dates', timestamps)
    };

    return this.http.get(this.expenseUrl, options);
  }

  editExpense (expense) {
    const dateString = this.getDateString(expense.date);
    expense.date = new Date(dateString).getTime();

    return this.http.post(this.expenseUrl, {expense: expense}).pipe(map((items) => {

      // @ts-ignore
      let totalExpenses = items.data.value.totalExpenses;
      localStorage.setItem('totalExpenses', totalExpenses);
    }),catchError((error) => {
      throw error;
    }));
  }

  deleteExpense (expenseId) {

    const options = {
      params: new HttpParams().set('expenseId', expenseId)
    };

    return this.http.delete(this.expenseUrl, options).pipe(map((result) => {
      // @ts-ignore
      let totalExpenses = result.data.value.totalExpenses;
      localStorage.setItem('totalExpenses', totalExpenses);
    }),
      catchError((error) => {
        throw error;
      }));
  }

  addExpense (expense) {
    const dateString = this.getDateString(expense.date);
    expense.date = new Date(dateString).getTime();

    return this.http.put(this.expenseUrl, {expense: expense}).pipe(map(items => {
      // @ts-ignore
      let totalExpenses = items.data.value.totalExpenses + expense.totalPaid;
      localStorage.setItem('totalExpenses', totalExpenses);
      this.afterChange.emit(expense);
    }));
  }

  getDateString = dateObject => {
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();

    return year + "-" + (month < 10 ? "0" + month: month) + "-" + (day < 10 ? "0" + day: day) + "T00:00:00";
  };

  getTimestamp = date => {

    const dateParts = date.split("/");
    const year = Number(dateParts[2]);
    const month = Number(dateParts[1]);
    const day = Number(dateParts[0]);

    let dateString = year + "-" + (month < 10 ? "0" + month: month) + "-" + (day < 10 ? "0" + day: day) + "T00:00:00";
    return new Date(dateString).getTime();
  };

  saveSettings = (settings) => {
    let savedSettings = settings;
    return this.http.post(this.settingsUrl, {settings: savedSettings}).pipe(map(result => {

      let settings = {
        monthEnd: savedSettings.monthEnd,
        monthStart: savedSettings.monthStart,
        monthlyIncome: savedSettings.monthlyIncome
      };
      // @ts-ignore
      localStorage.setItem('currentSettings', JSON.stringify(settings));
      // @ts-ignore

      localStorage.setItem('currentCategories', JSON.stringify(result.data));

    }), catchError((error) => {
      throw error;
    }));
  };

  getSettings() {
    return this.http.get(this.settingsUrl).pipe(map(result => {
      // @ts-ignore
      return result.data;
    }));
  }

}
