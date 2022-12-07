import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DialogService } from '../../services/dialog.service';
import { distinctUntilChanged, filter, map, Observable } from 'rxjs';
import { AbsencesService } from 'src/app/services/absences.service';



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
    all = 'all',
    sick = 'sick',
    vacation = 'vacation',
}


@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {

    constructor(public dialogService: DialogService, private absencesService: AbsencesService) {

    }

    date = moment();
    calendar: Array<CalendarItem[]> = [];
    calendarType: string = 'month';
    months = moment.months();
    weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    selectedAbsenceFilter = '';
    selectedAbsenceType = 'sick';
    absenceTypes: AbsenceType[] = [
        { value: AbsenceTypeEnums.all, viewValue: 'All' },
        { value: AbsenceTypeEnums.sick, viewValue: 'Sick' },
        { value: AbsenceTypeEnums.vacation, viewValue: 'Vacation' }
    ];
    currentAbsence = {}

    absencesArray$?: Observable<AbsenceItem[]>;


    ngOnInit(): void {
        this.absencesArray$ = this.absencesService.absencesArray
        this.absencesArray$.pipe(distinctUntilChanged()).subscribe(_ => this.calendar = this.createCalendar(this.date, this.selectedAbsenceFilter));
    }

    filterByAbsence() {
        this.calendar = this.createCalendar(this.date, this.selectedAbsenceFilter)
    }

    updateAbsence(fullDate: string) {
        this.absencesService.currentAbsenceID = fullDate;
        let currAbs = this.absencesService.absencesArray.value.find(item => item.fromDate === fullDate || item.toDate === fullDate
            || moment(fullDate).isBetween(item.fromDate, item.toDate))
        this.currentAbsence = { ...currAbs }
        this.dialogService.currentAbsence = this.currentAbsence
        this.handleDialogView(true, 'updateDialog', fullDate)
    }

    handleDialogView(state: boolean, dialog: any, currentDay: any) {        
        this.absencesService.currentAbsenceID = currentDay
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
        this.calendar = this.createCalendar(this.date.month(e.target.getAttribute('name')), this.selectedAbsenceFilter);
    }

    createCalendar(month: moment.Moment, filter: string) {
        let absences = this.absencesService.absencesArray.value;

        absences = absences.filter(abs => abs.absType !== filter)

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
            calendar.push(this.createCalendarItem(clone, 'previous-month', absences));
            clone.add(1, 'days');
        }

        for (let i = 0; i < daysInMonth; i++) {
            calendar.push(this.createCalendarItem(clone, 'in-month', absences));
            clone.add(1, 'days');
        }

        for (let i = 0; i < daysAfter; i++) {
            calendar.push(this.createCalendarItem(clone, 'next-month', absences));
            clone.add(1, 'days');
        }

        let result = calendar.reduce((pre: Array<CalendarItem[]>, curr: CalendarItem) => {
            absences.forEach(abs => {
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

    createCalendarItem(data: moment.Moment, className: string, absences: AbsenceItem[]) {
        const dayName = data.format('ddd');
        let absenceItem = {
            absType: '',
            fromDate: '',
            toDate: '',
            comment: '',
            taken: false,
        }
        absences.forEach(el => {
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
        this.calendar = this.createCalendar(this.date, this.selectedAbsenceFilter);
    }
}