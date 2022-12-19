import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { AbsencesService } from "../services/absences.service";
import { addAbsence, deleteAbsence, getAllAbsences, setAllAbsences, setStatusError, setStatusPending, setStatusSucces, updateAbsence } from "./absence.actions";


@Injectable()
export class AbsenceEffects {
    constructor(private actions$: Actions, private absencesService: AbsencesService) { }

    getAbsences$ = createEffect(() => this.actions$.pipe(
        ofType(getAllAbsences),
        exhaustMap(() => {
            return this.absencesService.getAllAbsences().pipe(
                map((absences) => {
                    return setAllAbsences({ payload: absences })
                })
            )
        }),
        catchError(error => of(setStatusError, error))
    ));

    addAbsence$ = createEffect(() => this.actions$.pipe(
        ofType(addAbsence),
        exhaustMap((absence) => {
            return this.absencesService.addAbsence(absence).pipe(
                map(() => {
                    return setStatusSucces();
                })
            )
        }),
        catchError(error => of(setStatusError, error))
    ));

    deleteAbsence$ = createEffect(() => this.actions$.pipe(
        ofType(deleteAbsence),
        exhaustMap((action) => {
            return this.absencesService.deleteAbsence(action.payload).pipe(
                map(() => {
                    return setStatusSucces();
                })
            )
        }),
        catchError(error => of(setStatusError, error))
    ));

    updateAbsence$ = createEffect(() => this.actions$.pipe(
        ofType(updateAbsence),
        exhaustMap((action) => {
            return this.absencesService.updateAbsence(action.id, action.newAbsence).pipe(
                map(() => {
                    return setStatusSucces();
                })
            )
        }),
        catchError(error => of(setStatusError, error))
    ));
}