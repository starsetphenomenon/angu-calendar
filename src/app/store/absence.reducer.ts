import { createReducer, on } from '@ngrx/store';
import { AbsenceItem } from '../components/calendar/calendar.component';
import { addAbsence, deleteAbsence, setAvailableDays, updateAbsence } from './absence.actions';

export interface AvailableDays {
    sick: {
        entitlement: number,
        taken: number,
    },
    vacation: {
        entitlement: number,
        taken: number,
    },
}

export interface Dialogs {
    requestDialog: boolean,
    updateDialog: boolean,
}

export interface AppState {
    absences: AbsenceItem[],
    availableDays: AvailableDays,
}

const initialState: AppState = {
    availableDays: {
        sick: {
            entitlement: 20,
            taken: 7,
        },
        vacation: {
            entitlement: 10,
            taken: 4,
        },
    },
    absences: [{
        id: 1,
        absenceType: 'sick',
        fromDate: '2022-12-17',
        toDate: '2022-12-21',
        comment: 'I am SICK!',
    }, {
        id: 2,
        absenceType: 'vacation',
        fromDate: '2022-12-02',
        toDate: '2022-12-07',
        comment: 'Yuppi, freedom...',
    }],
}

export const absenceReducer = createReducer(
    initialState,
    on(addAbsence, (state, action: AbsenceItem) => {
        return {
            ...state,
            absences: [...state.absences, { ...action, id: state.absences.length + 1 }],
        };
    }),
    on(deleteAbsence, (state, action) => {
        return {
            ...state,
            absences: [...state.absences.filter(el => el.id !== action.payload)],
        };
    }),
    on(updateAbsence, (state, action) => {
        let newAbsences = state.absences.map(el => el.id === action.absenceId ? action.newAbsence : el);
        return {
            ...state,
            absences: newAbsences,
        };
    }),
    on(setAvailableDays, (state, action: AvailableDays) => {
        return {
            ...state,
            availableDays: action,
        };
    }),

);