import { Component, Input, DoCheck, OnInit } from '@angular/core';
import { AbsenceType } from '../calendar/calendar.component';
import { DialogService } from '../../services/dialog.service';
import { RequestService } from '../../services/request.service';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';

interface absenceFormInt {
    absenceType: string,
    fromDate: string,
    toDate: string,
    comment: string,
}


@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {
    dateNow = new Date()
    absType = '';
    dialogData = {};
    absenceForm: FormGroup;
    constructor(private dialogService: DialogService, private requestService: RequestService) {

    }
    maxDate = null;
    minDate = null;

    ngOnInit() {
        this.absenceForm = new FormGroup({
            absenceType: new FormControl('vacation', Validators.required),
            fromDate: new FormControl(this.dateNow, Validators.required),
            toDate: new FormControl(this.dateNow, Validators.required),
            comment: new FormControl('', Validators.required),
        })
        this.absenceForm.valueChanges.subscribe(selectedValue => {
            this.maxDate = selectedValue.toDate
            this.minDate = selectedValue.fromDate
        })
    }

    getMomentDate(date: string) {
        return new Date(date)
    }

    onUpdateAbs(data: any) {
        data.fromDate = moment(data).format('YYYY-MM-DD')
        data.toDate = moment(data).format('YYYY-MM-DD')       
        this.requestService.updateAbsArr(data, this.dialogService.currentAbsence)

        this.handleDialogView(false)
    }

    handleDialogView(state: boolean) {    
        this.dialogService.handleDialogView(state, this.name);
    }

    deleteAbsence() {
        this.requestService.deleteAbsence()
    }

    onRequest(data: absenceFormInt) {
        data.fromDate = moment(data.fromDate).format('YYYY-MM-DD')
        data.toDate = moment(data.toDate).format('YYYY-MM-DD')  
        this.requestService.onRequest({ ...data, taken: true })
        this.handleDialogView(false)
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
    @Input() name: string;
    @Input() showDialog: boolean;
    @Input() currentAbsence: any;
    @Input() title: string;
}