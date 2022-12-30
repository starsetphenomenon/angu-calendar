import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { registerUser, setErrorMessage } from '../../store/absence.actions';
import { AppState } from '../../store/absence.reducer';

@Component({
    selector: 'register-page',
    templateUrl: './register-page.html',
    styleUrls: ['./register-page.scss']
})

export class RegisterPage implements OnInit, OnDestroy {

    destroy$: Subject<boolean> = new Subject<boolean>();
    errorMessage?: string;
    errorMessage$?: Observable<string>;

    constructor(
        private store: Store<{ appState: AppState }>,
        public authService: AuthService,
    ) { }

    ngOnInit(): void {
        this.errorMessage$ = this.store.select((store) => store.appState.errorMessage);
        this.errorMessage$
            .pipe(takeUntil(this.destroy$))
            .subscribe((message) => {
                this.errorMessage = message;
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        this.store.dispatch(setErrorMessage({ message: '' }));
    }

    registerForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        userName: new FormControl('', [Validators.required, Validators.minLength(4)]),
        password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });

    onSubmit() {
        const user = this.registerForm.value;
        this.store.dispatch(registerUser(user));
    }

    goToLogin() {
        this.authService.redirectToLogin();
    }
}