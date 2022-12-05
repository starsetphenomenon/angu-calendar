import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DialogService {

  dialogs: any = {
    requestDialog: false,
    updateDialog: false,
  }

  currentAbsence: any = {}


  handleDialogView(state: boolean, dialog: any) {
    this.dialogs[dialog] = state;
  }

  setCurrentAbs(abs: any) {
    this.currentAbsence = { ...abs }
  }
}
