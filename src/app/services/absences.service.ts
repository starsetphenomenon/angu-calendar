import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { AbsenceItem } from '../components/calendar/calendar.component';

@Injectable({
  providedIn: 'root'
})
export class AbsencesService {

  constructor() { }

  absencesArray: BehaviorSubject<AbsenceItem[]> = new BehaviorSubject<AbsenceItem[]>([
    {
      absType: 'sick',
      fromDate: '2022-12-05',
      toDate: '2022-12-08',
      comment: 'I am sick now...',
      taken: true,
    },
    {
      absType: 'vacation',
      fromDate: '2022-12-13',
      toDate: '2022-12-17',
      comment: 'Free man',
      taken: false,
    },
    {
      absType: 'vacation',
      fromDate: '2022-11-07',
      toDate: '2022-11-08',
      comment: 'Iceland is waiting for me! :D',
      taken: false,
    },
    {
      absType: 'vacation',
      fromDate: '2023-01-07',
      toDate: '2023-01-08',
      comment: 'Can not wait for it... Yeah boy!',
      taken: false,
    }
  ])

  currentAbsenceID!: string;

  addAbsence(abs: AbsenceItem) {
    this.absencesArray.next([...this.absencesArray.value, abs])
  }

  deleteAbsence(id: string) {
    let item = this.absencesArray.value.find(item => (item.fromDate === id || item.toDate === id
      || moment(id).isBetween(item.fromDate, item.toDate)))
    this.absencesArray.next(this.absencesArray.value.filter(el => el !== item))
  }

  updateAbsence(absence: AbsenceItem, newAbsence: AbsenceItem) {
    let item = this.absencesArray.value.find(item => (item.fromDate === absence.fromDate || item.toDate === absence.toDate))
    if (item) {
      this.absencesArray.next([...this.absencesArray.value.filter(el => el !== item), newAbsence])
    }
  }


}
