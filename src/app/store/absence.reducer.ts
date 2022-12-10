import { createReducer, on } from '@ngrx/store';
import { AbsenceItem } from '../components/calendar/calendar.component';
import { addAbsence, deleteAbsence, updateAbsence } from './absence.actions';
import * as moment from 'moment';

export interface absences {
    absences: AbsenceItem[],
}
const initialState: absences = {
    absences: [{
        absenceType: 'sick',
        fromDate: '2022-12-17',
        toDate: '2022-12-21',
        comment: 'I am SICK!',
    }, {
        absenceType: 'vacation',
        fromDate: '2022-12-02',
        toDate: '2022-12-07',
        comment: 'Yuppi, freedom...',
    }]
}

export const absenceReducer = createReducer(
    initialState,
    on(addAbsence, (state, action) => {
        return {
            ...state,
            absences: [...state.absences, action.payload],
        };
    }),
    on(deleteAbsence, (state, action) => {
        let item = state.absences.find(item => (item.fromDate === action.payload || item.toDate === action.payload
            || moment(action.payload).isBetween(item.fromDate, item.toDate)));
        return {
            ...state,
            absences: [...state.absences.filter(el => el !== item)],
        };
    }),
    on(updateAbsence, (state, action) => {
        let item = state.absences.find(item => (item.fromDate === action.payload.oldAbsence.fromDate
            || item.toDate === action.payload.oldAbsence.toDate));
        let newAbsences = [...state.absences.filter(el => el !== item)]
        return {
            ...state,
            absences: [...newAbsences, action.payload.newAbsence],
        };
    }),
);