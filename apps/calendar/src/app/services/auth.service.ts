import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../components/calendar/calendar.component';
import { AppState } from '../store/absence.reducer';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private store: Store<{ appState: AppState }>,
        private router: Router
    ) { }

    BASE_URL: string = 'http://localhost:3333';
    API: string = 'api/users';

    registerUser(user: User) {
        return this.http.post<string>(`${this.BASE_URL}/${this.API}/register`, user, { responseType: 'text' as 'json' });
    }

    loginUser(user: User) {
        return this.http.post<string>(`${this.BASE_URL}/${this.API}/login`, user, { responseType: 'text' as 'json' });
    }

    setLocalToken(token: string) {
        localStorage.setItem('token', token);
    }

    get token() {
        return localStorage.getItem('token');
    }
}


