import { createReducer, on } from "@ngrx/store";
import { AbsenceItem } from "../components/calendar/calendar.component";
import { addAbsence, getAbsences } from "./absence.actions";

const initialAbsences: AbsenceItem[] = [
    {
        absType: 'sick',
        fromDate: '2022-12-03',
        toDate: '2022-12-05',
        comment: 'I am sick now...',
        taken: false,
    },
    {
        absType: 'vacation',
        fromDate: '2022-12-07',
        toDate: '2022-12-08',
        comment: 'Yeah boy!',
        taken: false,
    }
]

export const absencesReducer = createReducer<AbsenceItem[]>(initialAbsences,
    on(addAbsence, (state, action) => ({ ...state, ...action.absence })),
    on(getAbsences, (state) => state),
)