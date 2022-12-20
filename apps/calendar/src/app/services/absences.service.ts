import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbsenceItem } from '../components/calendar/calendar.component';
import { AvailableDays } from '../store/absence.reducer';

@Injectable({
  providedIn: 'root',
})

export class AbsencesService {
  constructor(
    private http: HttpClient) { }

  currentAbsenceDate!: string;
  currentAbsenceID!: number;

  BASE_URL: string = 'https://calendar-back.azurewebsites.net';
  API: string = 'api/absences'

  addAbsence(absence: AbsenceItem) {
    return this.http.post<{ absences: AbsenceItem[], availableDays: AvailableDays }>(`${this.BASE_URL}/${this.API}`, absence);
  }

  getAllAbsences() {
    return this.http.get<{ absences: AbsenceItem[], availableDays: AvailableDays }>(`${this.BASE_URL}/${this.API}`);
  }

  deleteAbsence(id: number) {
    return this.http.delete<{ absences: AbsenceItem[], availableDays: AvailableDays }>(`${this.BASE_URL}/${this.API}/${id}`);
  }

  updateAbsence(id: number, newAbsence: AbsenceItem) {
    return this.http.put<{ absences: AbsenceItem[], availableDays: AvailableDays }>(`${this.BASE_URL}/${this.API}/${id}`, newAbsence);
  }
}
