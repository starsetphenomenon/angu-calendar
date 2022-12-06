import { Component, DoCheck, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DialogService } from '../../services/dialog.service';
import { RequestService } from '../../services/request.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { addAbsence, getAbsences } from '../../store/absence.actions';
import { AppState } from '../../app-state';


interface CalendarItem {
    day: string;
    dayName: string;
    className: string;
    isWeekend: boolean;
    absence: AbsenceItem;
    fullDate: string;
}

export interface AbsenceItem {
    absType: string,
    fromDate: string,
    toDate: string,
    comment: string,
    taken: boolean,
}

export interface AbsenceType {
    value: AbsenceTypeEnums;
    viewValue: string;
}

const enum AbsenceTypeEnums {
    sick = 'sick',
    vacation = 'vacation',
}


@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit, DoCheck {

    absences$ = this.store.pipe(select(state => state.absencesArray));

    constructor(public dialogService: DialogService, private requestService: RequestService,
        private store: Store<AppState>) {
        console.log(this.absences$) 
    }   

    date = moment();
    calendar: Array<CalendarItem[]> = [];
    calendarType: string = 'month';
    months = moment.months();
    weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    selectedAbsenceFilter = '';
    selectedAbsenceType = 'sick';
    absenceTypes: AbsenceType[] = [
        { value: AbsenceTypeEnums.sick, viewValue: 'Sick' },
        { value: AbsenceTypeEnums.vacation, viewValue: 'Vacation' }
    ];
    currentAbsence = {}


    ngOnInit(): void {
        this.calendar = this.createCalendar(this.date);
        this.store.dispatch(getAbsences());
        this.store.dispatch(addAbsence({
            absence: {
                absType: 'vacation',
                fromDate: '2022-12-07',
                toDate: '2022-12-08',
                comment: 'Yeah boy!',
                taken: false,
            }
        }))
    }

    ngDoCheck() {
        let checkAbse = true;
        this.requestService.absencesArray.forEach(el => {
            if (el.fromDate === this.requestService.dialogData.fromDate || el.toDate === this.requestService.dialogData.toDate
                || el.toDate === this.requestService.dialogData.fromDate || el.fromDate === this.requestService.dialogData.toDate
                || this.requestService.dialogData.toDate === '' || this.requestService.dialogData.fromDate === '') {
                checkAbse = false
            }
        })
        if (checkAbse) {
            this.requestService.absencesArray.push(this.requestService.dialogData)
        }
        this.calendar = this.createCalendar(this.date);
    }

    updateAbsence(fullDate: string) {
        let currAbs = this.requestService.absencesArray.find(item => item.fromDate === fullDate || item.toDate === fullDate
            || moment(fullDate).isBetween(item.fromDate, item.toDate))
        this.currentAbsence = { ...currAbs }
        this.dialogService.currentAbsence = this.currentAbsence
        this.handleDialogView(true, 'updateDialog', this.currentAbsence)
        this.requestService.deleteAbsDate = fullDate;
    }

    handleDialogView(state: boolean, dialog: any, currentDay: any) {
        this.currentAbsence === currentDay
        if (dialog === 'requestDialog') {
            this.currentAbsence = {}
        }
        this.dialogService.handleDialogView(state, dialog)
    }

    setCalendarType(value: string) {
        this.calendarType = value;
    }

    setCurrentMonth(e: any) {
        this.calendarType = 'month';
        this.calendar = this.createCalendar(this.date.month(e.target.getAttribute('name')));
    }

    createCalendar(month: moment.Moment) {
        const daysInMonth = month.daysInMonth();
        const startOfMonth = month.startOf('months').format('ddd');
        const endOfMonth = month.endOf('months').format('ddd');
        const weekdaysShort = this.weekDays;
        const calendar: CalendarItem[] = [];

        const daysBefore = weekdaysShort.indexOf(startOfMonth);
        const daysAfter = weekdaysShort.length - 1 - weekdaysShort.indexOf(endOfMonth);

        const clone = month.startOf('months').clone();
        if (daysBefore > 0) {
            clone.subtract(daysBefore, 'days');
        }

        for (let i = 0; i < daysBefore; i++) {
            calendar.push(this.createCalendarItem(clone, 'previous-month'));
            clone.add(1, 'days');
        }

        for (let i = 0; i < daysInMonth; i++) {
            calendar.push(this.createCalendarItem(clone, 'in-month'));
            clone.add(1, 'days');
        }

        for (let i = 0; i < daysAfter; i++) {
            calendar.push(this.createCalendarItem(clone, 'next-month'));
            clone.add(1, 'days');
        }

        let result = calendar.reduce((pre: Array<CalendarItem[]>, curr: CalendarItem) => {
            this.requestService.absencesArray.forEach(abs => {
                if (moment(curr.fullDate).isBetween(abs.fromDate, abs.toDate)) { // mark all days btw the dates
                    curr.absence = {
                        absType: abs.absType,
                        fromDate: abs.fromDate,
                        toDate: abs.toDate,
                        comment: abs.comment,
                        taken: true,
                    }
                }
            })
            if (pre[pre.length - 1].length < weekdaysShort.length) {
                pre[pre.length - 1].push(curr);
            } else {
                pre.push([curr]);
            }
            return pre;
        }, [[]]);

        return result;
    }

    createCalendarItem(data: moment.Moment, className: string) {
        const dayName = data.format('ddd');
        let absenceItem = {
            absType: '',
            fromDate: '',
            toDate: '',
            comment: '',
            taken: false,
        }
        this.requestService.absencesArray.forEach(el => {
            if (el.fromDate === data.format('YYYY-MM-DD') || el.toDate === data.format('YYYY-MM-DD')) {
                absenceItem = {
                    absType: el.absType,
                    fromDate: el.fromDate,
                    toDate: el.toDate,
                    comment: el.comment,
                    taken: true,
                }
            }
        })

        return {
            day: data.format('DD'),
            dayName,
            className,
            isWeekend: dayName === 'Sun' || dayName === 'Sat',
            fullDate: data.format('YYYY-MM-DD'),
            absence: absenceItem,
        };
    }

    setCurrentDate(val: number, type: any) {
        this.date.add(val, type);
        this.calendar = this.createCalendar(this.date);
    }
}