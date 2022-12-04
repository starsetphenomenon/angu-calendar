import { Component, Input, DoCheck } from '@angular/core';
import { AbsenceType } from '../calendar/calendar.component';
import { DialogService } from '../../services/dialog.service';
import { RequestService } from '../../services/request.service';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements DoCheck {

    showDialog = true;
    absType = '';
    dialogData = {};

    constructor(private dialogService: DialogService, private requestService: RequestService) {
        this.showDialog = dialogService.showDialog
    }

    handleDialogView(state: boolean) {
        this.dialogService.handleDialogView(state);
    }

    onRequest(data: any) {
        this.requestService.onRequest({ ...data, taken: true })
        this.handleDialogView(false)
    }

    ngDoCheck() {
        this.showDialog = this.dialogService.showDialog;
    }

    formOnChange(name: string, value: any) {
        this.dialogData = {
            ...this.dialogData,
            [name]: value
        }
    }

    @Input() absenceTypes: AbsenceType[];
    @Input() selectedAbsence: string;
    @Input() isShown: boolean;

}