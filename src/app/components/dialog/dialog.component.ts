import { Component, Input, DoCheck, OnInit, OnChanges } from '@angular/core';
import { AbsenceItem, AbsenceType } from '../calendar/calendar.component';
import { DialogService } from '../../services/dialog.service';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AbsencesService } from 'src/app/services/absences.service';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit, OnChanges {
    dateNow = new Date()
    absType = '';
    absenceForm: FormGroup;
    maxDate = null;
    minDate = null;

    constructor(private dialogService: DialogService, private absencesService: AbsencesService) { }

    ngOnInit() {
        this.absenceForm = new FormGroup({
            absenceType: new FormControl('sick', Validators.required),
            fromDate: new FormControl(this.dateNow, Validators.required),
            toDate: new FormControl(this.dateNow, Validators.required),
            comment: new FormControl('', Validators.required),
        })
        this.absenceForm.valueChanges.subscribe(selectedValue => {
            this.maxDate = selectedValue.toDate
            this.minDate = selectedValue.fromDate
        })
    }

    ngOnChanges(changes: any) {
        if (changes.showDialog) {
            if (this.absenceForm) {
                this.absenceForm.patchValue({
                    absenceType: 'sick',
                    fromDate: this.absencesService.currAbsID,
                    toDate: this.absencesService.currAbsID,
                    comment: '',
                });
            }
        }
    }

    onUpdateAbs() {
        this.absenceForm.value.comment = this.dialogService.currentAbsence.comment
        this.absencesService.updateAbsence(this.dialogService.currentAbsence, this.absenceForm.value)
        this.handleDialogView(false)
    }

    handleDialogView(state: boolean) {
        this.dialogService.handleDialogView(state, this.name);
        this.absenceForm.patchValue({
            absenceType: this.dialogService.currentAbsence.absType,
            fromDate: this.absencesService.currAbsID,
            toDate: this.absencesService.currAbsID,
        });
    }

    deleteAbsence() {
        this.absencesService.deleteAbsence(this.absencesService.currAbsID)
        this.handleDialogView(false)
    }

    onRequest(data: AbsenceItem) {
        data.fromDate = moment(data.fromDate).format('YYYY-MM-DD')
        data.toDate = moment(data.toDate).format('YYYY-MM-DD')
        this.absencesService.addAbsence(data)
        this.handleDialogView(false)
    }


    @Input() absenceTypes: AbsenceType[];
    @Input() selectedAbsence: string;
    @Input() isShown: boolean;
    @Input() name: string;
    @Input() showDialog: boolean;
    @Input() currentAbsence: any;
    @Input() title: string;
}