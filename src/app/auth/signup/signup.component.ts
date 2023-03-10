import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatchPasswordService} from "../../_validators/match-password.service";
import {UniqueUsernameService} from "../../_validators/unique-username.service";
import {AuthService} from "../../_services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private matchPassword: MatchPasswordService,
    private uniqueUsername: UniqueUsernameService,
    private authService: AuthService,
    private router:Router
  ) {
  }

  form = new FormGroup({
      username: new FormControl(
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
        [this.uniqueUsername.validate.bind(this.uniqueUsername)]),
      password: new FormControl(
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(25)]
      ),
      passwordConformation: new FormControl(
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(25)]
      )
    },
    {
      validators: [this.matchPassword.validate]
    }
  );

  get f() {
    return this.form;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // @ts-ignore
    this.authService.signup(this.form.value).subscribe((response) => {
     this.router?.navigate(['/inbox']);
    }, (error) => {
      if (!error.status) {
        this.form.setErrors({noConnection: true});
      } else {
        this.form.setErrors({unknownError: true});
      }
    })
  }

  showErrorPasswordDontMatch() {
    return this.form.controls.password.dirty &&
      this.form.controls.password.touched &&
      this.form.controls.passwordConformation.dirty &&
      this.form.controls.passwordConformation.touched
  }
}
