import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../_services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(25),
    ]),
  });

  get f() {
    return this.form;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // @ts-ignore
    this.authService.signin(this.form.value).subscribe((res) => {
        this.router?.navigate(['/inbox']);
      }, (error) => {
        if (!error.status) {
          this.form.setErrors({noConnection: true});
          return;
        }
        if (error.error.username || error.error.password) {
          this.form.setErrors({credential: true});
          return;
        }
      }
    );
  }

  ngOnInit(): void {
  }

  showErrorPasswordDontMatch() {
    return (
      this.form.controls.password.dirty &&
      this.form.controls.password.touched &&
      this.form.controls.username.dirty &&
      this.form.controls.username.touched
    );
  }
}

