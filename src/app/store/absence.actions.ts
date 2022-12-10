import { createAction, props } from '@ngrx/store';
import { AbsenceItem } from '../components/calendar/calendar.component';

export const addAbsence = createAction(
    '[Absences] Add Absence',
    props<{ payload: AbsenceItem }>()
);

export const deleteAbsence = createAction(
    '[Absences] Delete Absence',
    props<{ payload: string }>()
);

export const updateAbsence = createAction(
    '[Absences] Update Absence',
    props<{ payload: { oldAbsence: AbsenceItem, newAbsence: AbsenceItem } }>()
);
