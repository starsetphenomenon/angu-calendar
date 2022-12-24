import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'login-page',
    templateUrl: './login-page.html',
    styleUrls: ['./login-page.scss']
})
export class LoginPage implements OnInit {

    constructor() {

    }

    ngOnInit(): void {

    }

    loginForm: FormGroup = new FormGroup({
        userName: new FormControl('', [Validators.required, Validators.minLength(4)],),
        password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });

    onSubmit() {
       
    }
}