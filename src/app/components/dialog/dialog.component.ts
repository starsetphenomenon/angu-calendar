import { Component, Input, DoCheck } from '@angular/core';
import { AbsenceType } from '../calendar/calendar.component';
import { DialogService } from '../../services/dialog.service';
import { RequestService } from '../../services/request.service';
import * as moment from 'moment';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})



export class DialogComponent implements DoCheck {
    dateNow = new Date()
    absType = '';
    dialogData = {};

    constructor(private dialogService: DialogService, private requestService: RequestService) {
        this.showDialog = dialogService.dialogs[this.name]
    }

    getMomentDate(date: string) {
        return new Date(date)
    }

    onUpdateAbs(data: any) {
        this.requestService.updateAbsArr(data, this.dialogService.currentAbsence)
              

        this.handleDialogView(false)
    }

    handleDialogView(state: boolean) {
        this.dialogService.handleDialogView(state, this.name);
    }

    deleteAbsence() {
        this.requestService.deleteAbsence()
    }

    onRequest(data: any) {
        this.requestService.onRequest({ ...data, taken: true })
        this.handleDialogView(false)
    }

    ngDoCheck() {
        this.showDialog = this.dialogService.dialogs[this.name]
    }

    formOnChange(name: string, value: any) {
        if (moment.isDate(value)) {
            value = moment(value).format('YYYY-MM-DD')
        }
        this.dialogData = {
            ...this.dialogData,
            [name]: value
        }
    }

    @Input() absenceTypes: AbsenceType[];
    @Input() selectedAbsence: string;
    @Input() isShown: boolean;
    @Input() showDialog: boolean;
    @Input() name: string;
    @Input() currentAbsence: any;
    @Input() title: string;
}