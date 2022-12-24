import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'register-page',
    templateUrl: './register-page.html',
    styleUrls: ['./register-page.scss']
})

export class RegisterPage {

    constructor() {

    }

    ngOnInit(): void {

    }

    registerForm: FormGroup = new FormGroup({
        userFirstName: new FormControl('', [Validators.required, Validators.minLength(4)],),
        userLastName: new FormControl('', [Validators.required, Validators.minLength(4)]),
        userName: new FormControl('', [Validators.required, Validators.minLength(4)],),
        password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });

    onSubmit() {
        
    }
}