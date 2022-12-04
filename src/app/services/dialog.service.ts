import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DialogService {

    showDialog = false;

    handleDialogView(state:boolean) {
      this.showDialog = state;
    }
}
