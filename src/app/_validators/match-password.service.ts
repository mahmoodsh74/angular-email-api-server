import {Injectable} from '@angular/core';
import {AbstractControl, ValidationErrors, Validator} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class MatchPasswordService implements Validator {

  constructor() {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const {password, passwordConformation} = control.value;
    if (password === passwordConformation) return null;
    return {passwordDontMatch: true};
  }
}
