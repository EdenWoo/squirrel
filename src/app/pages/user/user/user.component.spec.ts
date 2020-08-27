import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from '@sq/app/pages/user/user-routing.module';
import { SharedModule } from '@sq/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TextMaskModule } from 'angular2-text-mask';
import { UserStoreModule } from '@sq/libs/stores/user/user-store.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UsersComponent } from '@sq/app/pages/user/users/users.component';
import { StoreModule } from '@ngrx/store';
import * as fromUser from '@sq/libs/stores/user/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '@sq/libs/stores/user/user.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DummyUser } from '@sq/app/pages/user/user/dummy-user';
import { ValidationPattens } from '@sq/app/shared/utils/utils';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent, UsersComponent],
      imports: [
        StoreModule.forRoot(
          {},
          {
            metaReducers: [],
            runtimeChecks: {
              strictActionImmutability: true,
              strictStateImmutability: true,
            },
          },
        ),
        EffectsModule.forRoot([]),
        StoreModule.forFeature(fromUser.userFeatureName, fromUser.userReducer),
        EffectsModule.forFeature([UserEffects]),
        CommonModule,
        UserRoutingModule,
        SharedModule,
        FlexLayoutModule,
        MatPasswordStrengthModule,
        MatDatepickerModule,
        MatNativeDateModule,
        TextMaskModule,
        UserStoreModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        RouterModule,
        RouterTestingModule.withRoutes([]),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // password
  it('should show error message when password not have uppercase letter', () => {
    const userWithPasswordWithoutUpperCase = { ...DummyUser, password: '12324sfdsad!' };
    component.form.patchValue(userWithPasswordWithoutUpperCase);
    fixture.detectChanges();
    const passwordControl = component.form.controls.password;

    expect(component.form.invalid).toBeTruthy();

    expect(passwordControl.invalid).toBeTruthy();
    expect(passwordControl.hasError(ValidationPattens.hasUpperCase.name)).toBeTruthy();
  });

  it('should not show error message when password is valid', () => {
    const userWithValidPassword = { ...DummyUser, password: '111aaaZZZ!', confirmPassword: '111aaaZZZ!' };
    component.form.patchValue(userWithValidPassword);
    fixture.detectChanges();
    const passwordControl = component.form.controls.password;

    expect(component.form.invalid).toBeFalsy();

    expect(passwordControl.invalid).toBeFalsy();
    expect(passwordControl.hasError(ValidationPattens.hasUpperCase.name)).toBeFalsy();
  });

  // repeat password
  it('should show error message when confirm password is not match', () => {
    const userWithConfirmPassword = { ...DummyUser, confirmPassword: '12324sfdsad!' };
    component.form.patchValue(userWithConfirmPassword);
    fixture.detectChanges();
    const confirmPasswordControl = component.form.controls.confirmPassword;

    expect(component.form.invalid).toBeTruthy();

    expect(confirmPasswordControl.invalid).toBeTruthy();
    expect(confirmPasswordControl.hasError('passwordMatchError')).toBeTruthy();
  });

  // Date of birth
  it('should show an error message when the user is younger than 18y', () => {
    const userUnder18y = { ...DummyUser, dateOfBirth: '01/01/2018' };
    component.form.patchValue(userUnder18y);
    fixture.detectChanges();
    const userDateOfBirthControl = component.form.controls.dateOfBirth;

    expect(component.form.invalid).toBeTruthy();

    expect(userDateOfBirthControl.invalid).toBeTruthy();
    expect(userDateOfBirthControl.hasError('tooYoung')).toBeTruthy();
  });

  it('should not show an error message when the user is older than 18y', () => {
    const userOver18y = { ...DummyUser, dateOfBirth: '01/01/1990' };
    component.form.patchValue(userOver18y);
    fixture.detectChanges();
    const userDateOfBirthControl = component.form.controls.dateOfBirth;

    expect(component.form.invalid).toBeFalsy();

    expect(userDateOfBirthControl.invalid).toBeFalsy();
  });

  it('should show an error message when the month is lager than 12', () => {
    const userWithInvalidDOB = { ...DummyUser, dateOfBirth: '01/14/2018' };
    component.form.patchValue(userWithInvalidDOB);
    fixture.detectChanges();
    const userDateOfBirthControl = component.form.controls.dateOfBirth;

    expect(component.form.invalid).toBeTruthy();

    expect(userDateOfBirthControl.invalid).toBeTruthy();
    expect(userDateOfBirthControl.hasError('dateInvalid')).toBeTruthy();
  });

  it('should show an error message when the date is lager than 31', () => {
    const userWithInvalidDOB = { ...DummyUser, dateOfBirth: '39/01/1988' };
    component.form.patchValue(userWithInvalidDOB);
    fixture.detectChanges();
    const userDateOfBirthControl = component.form.controls.dateOfBirth;

    expect(component.form.invalid).toBeTruthy();

    expect(userDateOfBirthControl.invalid).toBeTruthy();
    expect(userDateOfBirthControl.hasError('dateInvalid')).toBeTruthy();
  });

  it('should show an error message when date is in the future', () => {
    const userWithInvalidDOB = { ...DummyUser, dateOfBirth: '01/14/2028' };
    component.form.patchValue(userWithInvalidDOB);
    fixture.detectChanges();
    const userDateOfBirthControl = component.form.controls.dateOfBirth;

    expect(component.form.invalid).toBeTruthy();

    expect(userDateOfBirthControl.invalid).toBeTruthy();
    expect(userDateOfBirthControl.hasError('dateInvalid')).toBeTruthy();
  });
});
