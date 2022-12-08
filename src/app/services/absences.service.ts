import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { AbsenceItem } from '../components/calendar/calendar.component';

export interface iAvailableDays {
  sick: {
    entitlement: number,
    taken: number,
  },
  vacation: {
    entitlement: number,
    taken: number,
  },
}

@Injectable({
  providedIn: 'root'
})
export class AbsencesService {

  constructor() { }

  absencesArray: BehaviorSubject<AbsenceItem[]> = new BehaviorSubject<AbsenceItem[]>([
    {
      absenceType: 'sick',
      fromDate: '2022-12-05',
      toDate: '2022-12-08',
      comment: 'I am sick now...',
    },
    {
      absenceType: 'vacation',
      fromDate: '2022-12-13',
      toDate: '2022-12-17',
      comment: 'Free man',
    }
  ])

  currentAbsenceID!: string;

  availableDays: BehaviorSubject<iAvailableDays> = new BehaviorSubject<iAvailableDays>({
    sick: {
      entitlement: 20,
      taken: 7,
    },
    vacation: {
      entitlement: 10,
      taken: 4,
    },
  })

  getAvailableDays(): Observable<iAvailableDays> {
    return this.availableDays.asObservable();
  }

  setAvailableDays(newValue: iAvailableDays) {
    this.availableDays.next(newValue);
  }

  addAbsence(abs: AbsenceItem) {
    this.absencesArray.next([...this.absencesArray.value, abs]);
  }

  deleteAbsence(id: string) {
    let item = this.absencesArray.value.find(item => (item.fromDate === id || item.toDate === id
      || moment(id).isBetween(item.fromDate, item.toDate)));
    this.absencesArray.next(this.absencesArray.value.filter(el => el !== item));
  }

  updateAbsence(absence: AbsenceItem, newAbsence: AbsenceItem) {
    let item = this.absencesArray.value.find(item => (item.fromDate === absence.fromDate || item.toDate === absence.toDate));
    if (item) {
      this.absencesArray.next([...this.absencesArray.value.filter(el => el !== item), newAbsence]);
    }
  }


}
