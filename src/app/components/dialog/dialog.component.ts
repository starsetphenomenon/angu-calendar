import { Component, Input, DoCheck, ElementRef, ViewChild } from '@angular/core';
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
    showDialog = true;
    absType = '';
    dialogData = {};

    constructor(private dialogService: DialogService, private requestService: RequestService) {
        this.showDialog = dialogService.showDialog
    }

    getMomentDate(date: string) {
        return moment(date).format('MM/DD/YYYY')
    }

    handleDialogView(state: boolean) {
        this.dialogService.handleDialogView(state);
    }

    onRequest(data: any) {
        this.requestService.onRequest({ ...data, taken: true })
        this.handleDialogView(false)
        console.log(data)
    }

    ngDoCheck() {
        this.showDialog = this.dialogService.showDialog;
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

}