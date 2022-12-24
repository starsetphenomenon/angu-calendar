import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { LoginPage } from './components/login-page/login-page';
import { RegisterPage } from './components/register-page/register-page';

const routes: Routes = [
    { path: '',   redirectTo: '/calendar', pathMatch: 'full' },
    { path: 'calendar', component: CalendarComponent },
    { path: 'login', component: LoginPage },
    { path: 'register', component: RegisterPage },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }