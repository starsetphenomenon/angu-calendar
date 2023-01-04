import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map, mergeMap, of, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as actions from './absence.actions';


@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
    ) { }

    registerUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.registerUser),
            switchMap((user) => {
                return this.authService.registerUser(user)
                    .pipe(
                        catchError((error) => {
                            return throwError(error);
                        }));
            }),
            concatMap((response) => {
                this.authService.setLocalToken(response);
                this.router.navigate(['/calendar']);
                return [];
            }),
            catchError((error) => {
                return of(actions.setErrorMessage({ message: error.error.message }))
            })
        )
    );

    loginUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.loginUser),
            mergeMap((user) => {
                return this.authService.loginUser(user).pipe(
                    tap(resp => {
                        this.authService.setLocalToken(resp);
                        this.router.navigate(['/calendar']);
                    }),
                    catchError((error) => {
                        error.status === 401 ? error.message = 'Wrong credentials!' : null;
                        return of(actions.setErrorMessage({ message: error.message }));
                    })
                );
            })
        ), { dispatch: false }
    );

}
