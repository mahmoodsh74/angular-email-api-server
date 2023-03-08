import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() label = '';
  @Input() control?: FormControl;
  @Input() type = 'text';
  @Input() placeholder = '';

  ngOnInit(): void {
  }

  showErrors(){
    // @ts-ignore
    const {errors, touched, dirty} = this.control;
    return errors && dirty && touched
  }

}
