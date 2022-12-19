import { createReducer, on } from '@ngrx/store';
import { AbsenceItem } from '../components/calendar/calendar.component';
import {
  addAbsence,
  deleteAbsence,
  getAllAbsences,
  setAllAbsences,
  setAvailableDays,
  setStatusError,
  setStatusPending,
  setStatusSucces,
  updateAbsence,
} from './absence.actions';

export interface AvailableDays {
  sick: {
    entitlement: number;
    taken: number;
  };
  vacation: {
    entitlement: number;
    taken: number;
  };
}

export interface Dialogs {
  requestDialog: boolean;
  updateDialog: boolean;
}

export interface AppState {
  absences: AbsenceItem[];
  availableDays: AvailableDays;
  status: 'pending' | 'success' | 'error';
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
  absences: [],
  status: 'pending',
};

export const absenceReducer = createReducer(
  initialState,
  on(getAllAbsences, (state) => {
    return {
      ...state,
      status: 'pending',
    }
  }),
  on(setAllAbsences, (state: AppState, action) => {
    return {
      ...state,
      absences: action.payload,
      status: 'success',
    }
  }),
  on(addAbsence, (state, action: AbsenceItem) => {
    return {
      ...state,
      status: 'success',
      absences: [
        ...state.absences,
        { ...action, id: state.absences.length + 1 },
      ],

    };
  }),
  on(deleteAbsence, (state: AppState, action: { payload: number }) => {
    return {
      ...state,
      absences: [...state.absences.filter(el => el.id !== action.payload)],
    };
  }),
  on(updateAbsence, (state: AppState, action: { id: number, newAbsence: AbsenceItem }) => {
    let newAbsences = state.absences.map(el => el.id === action.id ? action.newAbsence : el);
    return {
      ...state,
      absences: newAbsences,
    };
  }),
  on(setAvailableDays, (state: AppState, action: AvailableDays) => {
    return {
      ...state,
      availableDays: action,
    };
  }),
  on(setStatusSucces, (state) => {
    return {
      ...state,
      status: 'success'
    }
  }),
  on(setStatusPending, (state) => {
    return {
      ...state,
      status: 'pending'
    }
  }),
  on(setStatusError, (state) => {
    return {
      ...state,
      status: 'error'
    }
  })
);
