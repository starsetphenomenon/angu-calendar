import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { AbsenceItem } from '../components/calendar/calendar.component';
import { addAbsence, deleteAbsence, updateAbsence } from '../store/absence.actions';

export interface AvailableDays {
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

  constructor(private store: Store<{ absences: { absences: AbsenceItem[] } }>) { }

  currentAbsenceID!: string;

  availableDays: BehaviorSubject<AvailableDays> = new BehaviorSubject<AvailableDays>({
    sick: {
      entitlement: 20,
      taken: 7,
    },
    vacation: {
      entitlement: 10,
      taken: 4,
    },
  })

  getAvailableDays(): Observable<AvailableDays> {
    return this.availableDays.asObservable();
  }

  setAvailableDays(newValue: AvailableDays) {
    this.availableDays.next(newValue);
  }

  addAbsence(abs: AbsenceItem) {
    this.store.dispatch(addAbsence({ payload: abs }))
  }

  deleteAbsence(id: string) {
    this.store.dispatch(deleteAbsence({ payload: id }))
  }

  updateAbsence(absence: AbsenceItem, newAbsence: AbsenceItem) {
    this.store.dispatch(updateAbsence({ payload: { oldAbsence: absence, newAbsence: newAbsence } }))
  }


}
