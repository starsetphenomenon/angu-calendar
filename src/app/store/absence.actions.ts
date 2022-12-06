import { createAction, props } from "@ngrx/store";
import { AbsenceItem } from "../components/calendar/calendar.component";

export const addAbsence = createAction('[Absence] Add Absence', props<{ absence: AbsenceItem }>())
export const getAbsences = createAction('[Absence] Get Absences');