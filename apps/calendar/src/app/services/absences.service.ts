import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AbsenceItem } from '../components/calendar/calendar.component';
import { AppState } from '../store/absence.reducer';

@Injectable({
  providedIn: 'root',
})
export class AbsencesService {
  constructor(
    private http: HttpClient,
    private store: Store<AppState>) { }

  currentAbsenceDate!: string;
  currentAbsenceID!: number;

  addAbsence(absence: AbsenceItem) {
    return this.http.post<AbsenceItem>('http://localhost:3333/api/absences', absence);
  }

  getAllAbsences() {
    return this.http.get<AbsenceItem[]>('http://localhost:3333/api/absences');
  }

  deleteAbsence(id: number) {
    return this.http.delete<AbsenceItem[]>(`http://localhost:3333/api/absences/${id}`);
  }

  updateAbsence(id: number, newAbsence: AbsenceItem) {
    return this.http.put<AbsenceItem[]>(`http://localhost:3333/api/absences/${id}`, newAbsence);
  }
}
