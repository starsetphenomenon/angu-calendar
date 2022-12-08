import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { AbsenceItem, AbsenceType } from '../calendar/calendar.component';
import { DialogService } from '../../services/dialog.service';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AbsencesService } from 'src/app/services/absences.service';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],   
})

export class DialogComponent implements OnInit, OnChanges {
    @Input() absenceTypes?: AbsenceType[];
    @Input() name!: string;
    @Input() showDialog!: boolean;
    @Input() currentAbsence!: AbsenceItem;
    @Input() title!: string;

    dateNow = new Date()
    absenceForm!: FormGroup;
    maxDate = null;
    minDate = null;
    isTaken = false;
    outOfDays = false;
    availableSickDays = 0;
    availableVacationDays = 0;

    constructor(private dialogService: DialogService, private absencesService: AbsencesService) { }

    ngOnInit() {
        this.absencesService.getAvailableDays().subscribe((value) => {
            this.availableSickDays = value.sick.entitlement - value.sick.taken;
            this.availableVacationDays = value.vacation.entitlement - value.vacation.taken;
        });
        this.absenceForm = new FormGroup({
            absenceType: new FormControl('sick', Validators.required),
            fromDate: new FormControl(this.dateNow, Validators.required),
            toDate: new FormControl(this.dateNow, Validators.required),
            comment: new FormControl('', Validators.required),
        })
        this.absenceForm.valueChanges.subscribe(selectedValue => {
            this.maxDate = selectedValue.toDate;
            this.minDate = selectedValue.fromDate;
        })
    }

    ngOnChanges(changes: any) {
        if (changes.showDialog) {
            if (this.absenceForm) {
                this.absenceForm.patchValue({
                    absenceType: this.currentAbsence.absenceType,
                    fromDate: this.currentAbsence.fromDate,
                    toDate: this.currentAbsence.toDate,
                    comment: '',
                });
                if (this.dialogService.dialogs.requestDialog) {
                   
                    this.absenceForm.patchValue({
                        absenceType: this.currentAbsence.absenceType,
                        fromDate: this.absencesService.currentAbsenceID,
                        toDate: this.absencesService.currentAbsenceID,
                        comment: '',
                    });
                }
            }
        }
    }

    onUpdateAbs() {
        this.changeDateFormat(this.absenceForm.value);
        this.absenceForm.value.comment = this.dialogService.currentAbsence.comment;
        this.absencesService.updateAbsence(this.dialogService.currentAbsence, this.absenceForm.value);
        this.handleDialogView(false);
    }

    handleDialogView(state: boolean) {
        this.outOfDays = false;
        this.isTaken = false;
        this.dialogService.handleDialogView(state, this.name);
        this.absenceForm.patchValue({
            absenceType: this.dialogService.currentAbsence.absenceType,
            fromDate: this.absencesService.currentAbsenceID,
            toDate: this.absencesService.currentAbsenceID,
        });
    }

    deleteAbsence() {
        this.absencesService.deleteAbsence(this.absencesService.currentAbsenceID);
        this.handleDialogView(false);
    }

    onRequest(data: AbsenceItem) {
        let currentAbsenceDuration = moment.duration(moment(this.absenceForm.value.toDate).diff(this.absenceForm.value.fromDate)).asDays() + 1;
        if (currentAbsenceDuration > this.availableVacationDays) {
            this.outOfDays = true;
            return
        }
        this.isTaken = false;
        this.outOfDays = false;
        this.absencesService.absencesArray.value.forEach(abs => {
            if (moment(data.fromDate).isBetween(abs.fromDate, abs.toDate) || moment(data.toDate).isBetween(abs.fromDate, abs.toDate)) {
                this.isTaken = true;
            }
        })
        if (this.isTaken) {
            return;
        }
        this.isTaken = false;
        this.changeDateFormat(data)
        this.absencesService.addAbsence(data);
        this.handleDialogView(false);
    }

    changeDateFormat(value: AbsenceItem) {
        value.fromDate = moment(value.fromDate).format('YYYY-MM-DD');
        value.toDate = moment(value.toDate).format('YYYY-MM-DD');
    }
}