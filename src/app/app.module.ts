import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DialogComponent } from './components/dialog/dialog.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { absencesReducer } from './store/absence.reducers';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatGridListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    StoreModule.forRoot({ absencesArray: absencesReducer }),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
