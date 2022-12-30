import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
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

  getAllAbsences(token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get<AbsenceItem[]>(`${this.BASE_URL}/${this.API}`, { headers });
  }

  getAvailableDays() {
    return this.http.get<AvailableDays>(`${this.BASE_URL}/${this.API}/availableDays`, { headers: this.getHeaders() });
  }

  addAbsence(absence: AbsenceItem) {
    return this.http.post(`${this.BASE_URL}/${this.API}`, absence, { headers: this.getHeaders() });
  }

  deleteAbsence(id: number) {
    return this.http.delete(`${this.BASE_URL}/${this.API}/${id}`);
  }

  updateAbsence(id: number, newAbsence: AbsenceItem) {
    return this.http.put(`${this.BASE_URL}/${this.API}/${id}`, newAbsence);
  }

  updateAbsences() {
    const token = this.authService.getLocalToken();
    if (token !== null) {
      this.store.dispatch(getAllAbsences({ token }));
    }
  }

  getHeaders() {
    const token = this.authService.getLocalToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

}
