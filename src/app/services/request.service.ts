import { Inject, Injectable } from '@angular/core';
import * as moment from 'moment';
import { AbsenceItem } from '../components/calendar/calendar.component';
import { DialogService } from '../services/dialog.service';

@Injectable({
    providedIn: 'root'
})

export class RequestService {

    constructor(@Inject(DialogService) private dialogService: DialogService) { }

    dialogData: AbsenceItem = {
        absType: '',
        fromDate: '',
        toDate: '',
        comment: '',
        taken: false,
    }

    absencesArray: AbsenceItem[] = [
        {
            absType: 'sick',
            fromDate: '2022-12-03',
            toDate: '2022-12-05',
            comment: 'I am sick now...',
            taken: false,
        },
        {
            absType: 'vacation',
            fromDate: '2022-12-07',
            toDate: '2022-12-08',
            comment: 'Yeah boy!',
            taken: false,
        }
    ]

    onRequest(data: any) {
        this.dialogData = { ...data }
    }

    deleteAbsDate: string = '';

    updateAbsArr(data: any, currAbs: any) {
        let item = this.absencesArray.find(item => (item.fromDate === currAbs.fromDate || item.toDate === currAbs.toDate))
        this.absencesArray = [...this.absencesArray.filter(el => el !== item)]
        item = { ...item, ...data }
        if (item) {
            this.absencesArray.push(item)
        }
    }

    deleteAbsence() {
        let id = this.deleteAbsDate;
        let item = this.absencesArray.find(item => (item.fromDate === id || item.toDate === id
            || moment(id).isBetween(item.fromDate, item.toDate)))
        this.absencesArray = this.absencesArray.filter(el => el !== item)
        this.dialogService.handleDialogView(false, 'updateDialog')
    }
}
