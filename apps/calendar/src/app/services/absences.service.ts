import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AbsenceItem, User, UserAbsence } from '../components/calendar/calendar.component';
import { getAllAbsences } from '../store/absence.actions';
import { AppState, AvailableDays } from '../store/absence.reducer';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AbsencesService {
  constructor(private http: HttpClient,
    private store: Store<{ appState: AppState }>,
    private authService: AuthService,
  ) { }

  currentAbsenceDate!: string;
  currentAbsenceID!: number;

  BASE_URL: string = 'http://localhost:3333';
  API: string = 'api/absences';

  getAllAbsences() {
    return this.http.get<AbsenceItem[]>(`${this.BASE_URL}/${this.API}`);
  }

  getAvailableDays() {
    return this.http.get<AvailableDays>(`${this.BASE_URL}/${this.API}/availableDays`);
  }

  addAbsence(absence: AbsenceItem) {
    return this.http.post(`${this.BASE_URL}/${this.API}`, absence);
  }

  deleteAbsence(id: number) {
    return this.http.delete(`${this.BASE_URL}/${this.API}/${id}`);
  }

  updateAbsence(id: number, newAbsence: AbsenceItem) {
    return this.http.put(`${this.BASE_URL}/${this.API}/${id}`, newAbsence);
  }

  updateAbsences() {
    this.store.dispatch(getAllAbsences());
  }

}
