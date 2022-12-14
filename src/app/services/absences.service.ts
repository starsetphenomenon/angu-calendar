import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AbsenceItem } from '../components/calendar/calendar.component';
import { addAbsence, deleteAbsence, updateAbsence } from '../store/absence.actions';
import { AppState } from '../store/absence.reducer';



@Injectable({
  providedIn: 'root'
})
export class AbsencesService {

  constructor(private store: Store<AppState>) { }

  currentAbsenceDate!: string;
  currentAbsenceID!: number;

  addAbsence(absence: AbsenceItem) {
    this.store.dispatch(addAbsence(absence))
  }

  deleteAbsence(id: number) {
    this.store.dispatch(deleteAbsence({ payload: id }))
  }

  updateAbsence(id: number, newAbsence: AbsenceItem) {
    this.store.dispatch(updateAbsence({ absenceId: id, newAbsence: newAbsence }))
  }


}
