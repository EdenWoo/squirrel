import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  focusFirstError,
  matchPasswordValidator,
  patternValidator,
  validateAge,
  validateAllFormFields,
  ValidationPattens,
} from '@sq/app/shared/utils/utils';
import { TextMaskConfig } from 'angular2-text-mask';
import { UserFacade } from '@sq/libs/stores/user/user.facade';

@Component({
  selector: 'sq-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  dateOfBirthMask: TextMaskConfig = {
    guide: true,
    showMask: true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  };
  form: FormGroup;
  ValidationPattens = ValidationPattens; // for html

  constructor(private formBuilder: FormBuilder, private userFacade: UserFacade, private el: ElementRef) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          patternValidator(ValidationPattens.hasSymbol.regex, { [ValidationPattens.hasSymbol.name]: true }),
          patternValidator(ValidationPattens.hasNumber.regex, { [ValidationPattens.hasNumber.name]: true }),
          patternValidator(ValidationPattens.hasUpperCase.regex, { [ValidationPattens.hasUpperCase.name]: true }),
        ],
      ],
      confirmPassword: ['', [Validators.required, matchPasswordValidator('password')]],
      dateOfBirth: ['', [Validators.required, validateAge()]],
      gender: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  save() {
    if (this.form.invalid) {
      validateAllFormFields(this.form);
      focusFirstError(this.form, this.el);
    } else {
      // submit
      this.userFacade.addUser(this.form.value);
    }
  }
}
