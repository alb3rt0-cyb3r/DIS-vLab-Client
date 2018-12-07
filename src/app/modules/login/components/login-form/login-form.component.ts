import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../../../../shared/services/auth.service';
import {HttpErrorService} from '../../../../shared/services/http-error.service';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

    loginForm: FormGroup;
    loading: boolean;
    alert: { error: string };

    constructor(private auth: AuthService,
                private httpError: HttpErrorService,
                private fb: FormBuilder,
                private router: Router) {
        this.createForm();
        this.loading = false;
        this.alert = {error: undefined};
    }

    onSubmit() {
        this.alert.error = undefined;
        this.loading = true;
        this.auth.login(this.loginForm.value)
            .subscribe(
                (res) => {
                    this.auth.setToken(res['token']);
                    this.loading = false;
                    this.router.navigate([this.auth.redirectUrl]);
                },
                (error: HttpErrorResponse) => {
                    this.alert.error = this.httpError.getMessageError(error);
                    this.loading = false;
                });
    }

    createForm() {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

}
