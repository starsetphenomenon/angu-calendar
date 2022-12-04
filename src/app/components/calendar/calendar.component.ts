import { Component, DoCheck, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DialogService } from '../../services/dialog.service';
import { RequestService } from '../../services/request.service';

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
    value: string;
    viewValue: string;
}


@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit, DoCheck {

    constructor(private dialogService: DialogService, private requestService: RequestService) {
        this.showDialog = dialogService.showDialog;
    }

    date = moment();
    calendar: Array<CalendarItem[]> = [];
    calendarType: string = 'month';
    months = moment.months();
    weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    selectedAbsenceFilter = '';
    selectedAbsenceType = 'sick';
    absenceTypes: AbsenceType[] = [
        { value: 'sick', viewValue: 'Sick' },
        { value: 'vacation', viewValue: 'Vacation' }
    ];
    showDialog = false;
    absencesArray: AbsenceItem[] = [
        {
            absType: 'sick',
            fromDate: '2022-12-03',
            toDate: '2022-12-05',
            comment: 'I am sick now...',
            taken: false,
        }
    ]


    ngOnInit(): void {
        this.calendar = this.createCalendar(this.date);
    }

    ngDoCheck() {
        let checkAbse = true;
        this.absencesArray.forEach(el => {
            if (el.fromDate === this.requestService.dialogData.fromDate || el.toDate === this.requestService.dialogData.toDate
                || el.toDate === this.requestService.dialogData.fromDate || el.fromDate === this.requestService.dialogData.toDate
                || this.requestService.dialogData.toDate === '' || this.requestService.dialogData.fromDate === '') {
                checkAbse = false
            }
        })
        if (checkAbse) {
            this.absencesArray.push(this.requestService.dialogData)
        }
        this.showDialog = this.dialogService.showDialog;
        this.calendar = this.createCalendar(this.date);
    }

    handleDialogView(state: boolean) {
        this.dialogService.handleDialogView(state)
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
            this.absencesArray.forEach(abs => {
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
        this.absencesArray.forEach(el => {
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