import { createAction, props } from '@ngrx/store';
import { AbsenceItem } from '../components/calendar/calendar.component';
import { AvailableDays } from './absence.reducer';

export const addAbsence = createAction(
    '[Absences] Add Absence',
    props<AbsenceItem>()
);

export const deleteAbsence = createAction(
    '[Absences] Delete Absence',
    props<{ payload: number }>()
);

export const updateAbsence = createAction(
    '[Absences] Update Absence',
    props<{ oldAbsenceId: number, newAbsence: AbsenceItem }>()
);

export const setAvailableDays = createAction(
    '[Available Days] Update Available Days',
    props<AvailableDays>()
);

export const handleDialogView = createAction(
    '[Dialogs] Handle Dialogs',
    props<{ state: boolean, dialog: string }>()
);

export const setCurrentAbsence = createAction(
    '[Absences] Set Current Absence',
    props<AbsenceItem>()
);
