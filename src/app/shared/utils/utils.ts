import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
// @ts-ignore
import moment from 'moment';
import { ChangeDetectorRef, ElementRef } from '@angular/core';

export const ValidationPattens = {
  hasNumber: { regex: /\d/, name: 'hasNumber', errorMsg: 'At least one number' },
  hasUpperCase: { regex: /[A-Z]/, name: 'hasUpperCase', errorMsg: 'At least one uppercase letter' },
  hasSymbol: { regex: /[-!@#$]/, name: 'hasSymbol', errorMsg: 'At least one symbol (e.g. !@#$)' },
};

export function matchPasswordValidator(passwordCtrlName: string) {
  let confirmPasswordCtrl: FormControl;
  let passwordCtrl: FormControl;

  return (control: FormControl) => {
    if (!control.parent) {
      return null;
    }

    // Initializing the validator.
    if (!confirmPasswordCtrl) {
      confirmPasswordCtrl = control;
      passwordCtrl = control.parent.get(passwordCtrlName) as FormControl;
      if (!passwordCtrl) {
        throw new Error('Password control is not found in parent group');
      }
      passwordCtrl.valueChanges.subscribe(() => {
        confirmPasswordCtrl.updateValueAndValidity();
      });
    }

    if (!passwordCtrl) {
      return null;
    }

    if (passwordCtrl.value !== confirmPasswordCtrl.value) {
      return {
        passwordMatchError: true,
      };
    }
    return null;
  };
}

export const patternValidator = (regex: RegExp, error: ValidationErrors): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      return null;
    }
    const valid = regex.test(control.value);
    return valid ? null : error;
  };
};

// Validates that the input string is a valid date formatted as "dd/mm/yyyy"
export const isValidDate = (dateString) => {
  // First check for the pattern
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
    return false;
  }

  // Parse the date parts to integers
  const parts = dateString.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month === 0 || month > 12) {
    return false;
  }

  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
    monthLength[1] = 29;
  }

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
};

export const validateAge = (): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      return null;
    }
    const date = moment(control.value, 'DD/MM/YYYY');

    if (!date.isValid()) {
      return { dateInvalid: true };
    }

    const years = moment().diff(control.value, 'years', false);

    if (years < 1) {
      return { dateInvalid: true };
    } else if (years <= 18) {
      return { tooYoung: true };
    }
    return null;
  };
};

export function validateAllFormFields(formGroup: FormGroup | any) {
  Object.keys(formGroup.controls).forEach((field) => {
    const control: FormControl | any = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control);
    } else if (control instanceof FormArray) {
      control.controls.map((c: FormControl | any) => {
        this.validateAllFormFields(c);
      });
    }
  });
}

export function focusFirstError(form: FormGroup, el: ElementRef, cd: ChangeDetectorRef) {
  if (form && form.controls) {
    for (const key of Object.keys(form.controls)) {
      if (form.controls[key].invalid) {
        const invalidControl = el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        setTimeout(() => {
          invalidControl.focus();
          cd.detectChanges();
        }, 0);
        return;
      }
    }
  }
}
