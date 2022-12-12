import { Injectable } from '@angular/core';
import { AbsenceItem } from '../components/calendar/calendar.component';

@Injectable({
  providedIn: 'root'
})

export class DialogService {

  dialogs: any = {
    requestDialog: false,
    updateDialog: false,
  }

  currentAbsence: AbsenceItem = {
    id: 0,
    absenceType: '',
    fromDate: '',
    toDate: '',
    comment: '',
  }

  handleDialogView(state: boolean, dialog: any) {
    this.dialogs[dialog] = state;
  }

  setCurrentAbs(abs: any) {
    this.currentAbsence = { ...abs }
  }
}
