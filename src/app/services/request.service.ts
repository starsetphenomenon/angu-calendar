import { Injectable } from '@angular/core';
import { AbsenceItem } from '../components/calendar/calendar.component';

@Injectable({
    providedIn: 'root'
})

export class RequestService {

    dialogData: AbsenceItem = {
        absType: '',
        fromDate: '',
        toDate: '',
        comment: '',
        taken: false,
    }

    onRequest(data: any) {
        this.dialogData = { ...data }
    }
}
