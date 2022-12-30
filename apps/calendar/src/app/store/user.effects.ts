import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as actions from './absence.actions';


@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
    ) { }

    registerUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.registerUser),
            concatMap((user) => {
                return this.authService.registerUser(user)
                    .pipe(
                        catchError((error) => of(error)));
            }),
            switchMap((user) => {
                if (user.error) {
                    return [actions.setErrorMessage({ message: user.error.message })];
                }
                this.authService.setLocalToken('pending');
                this.authService.redirectToLogin();
                return [];
            }),
            catchError((error) => of(actions.setErrorMessage(error), error)),
        )
    );

    loginUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.loginUser),
            concatMap((user) => {
                return this.authService.loginUser(user).pipe(
                    catchError((error) => of(error)));
            }),
            switchMap((response) => {
                if (response.status !== 201) {
                    return [actions.setErrorMessage({ message: response.error.message })];
                }
                this.authService.setLocalToken(response.error.text);
                this.authService.redirectToCalendar();
                return [];
            }),
        )
    );

}
