import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
    AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators
} from "@angular/forms";
import { LoginService } from "../../services/login.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
    formGroup!: FormGroup;
    model: { password: string; login: string } = {
        password: "",
        login: "",
    };

    constructor(private loginService: LoginService) { }
    ngOnInit(): void {
        this.formGroup = new FormGroup({
            login: new FormControl(this.model.login, [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl(this.model.password, [
                Validators.required,
                LoginComponent.passwordValidator()
            ])
        });
    }

    get login(): AbstractControl | null {
        return this.formGroup.get("login");
    }

    get password(): AbstractControl | null {
        return this.formGroup.get("password");
    }

    submit() {
        this.model.login = this.login?.value;
        this.model.password = this.password?.value;
        this.loginService.doLogin(this.model.login);
    }

    static passwordValidator(): ValidatorFn {
        return (currentControl: AbstractControl): ValidationErrors | null => {
            const isNotStrong = !LoginComponent.isPasswordStrong(currentControl.value);

            if (isNotStrong) {
                return { passwordValidator: true };
            }
            return null;
        };
    }

    static isPasswordStrong(password: string): boolean {
        return (
            password.length > 7 // check min length
            && /\d/.test(password) // has number
            && /[A-Z]/.test(password) // has uppercase
            && /[a-z]/.test(password) // has lowercase
            && /[!@#$%^&*(),.?":{}|<>]/.test(password) // has special char
        );
    }
}
