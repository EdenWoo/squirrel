import { DummyUser } from '../fixtures/dummy-user';
import { ValidationPattens } from '@sq/app/shared/utils/utils';
import { User } from '@sq/libs/stores/interfaces/user';

export const TestUrl = 'localhost:4200/';
export const ProdUrl = 'https://edenwoo.github.io/squirrel-app/';

export function fillForm(user: User) {
  cy.get('[data-testid=fullName]').clear().type(user.fullName);
  cy.get('[data-testid=email]').clear().type(user.email);
  cy.get('[data-testid=password]').clear().type(user.password);
  cy.get('[data-testid=confirmPassword]').clear().type(user.confirmPassword);
  cy.get('[data-testid=dateOfBirth]').clear().type(user.dateOfBirth);
  cy.get('[type="radio"]').check(user.gender, { force: true });
  cy.get('[data-testid=address]').clear().type(user.address);
}

describe('User Page', () => {
  const url = ProdUrl;
  before(() => {
    cy.visit(url);
  });
  it('check the title', () => {
    cy.get('title').invoke('text').should('equal', 'Squirrel');
  });

  it('should add user when submit valid form', () => {
    fillForm(DummyUser);

    cy.get('#submit').click();

    cy.get('mat-table').contains('mat-cell', DummyUser.fullName).should('be.visible');
    cy.get('mat-table').contains('mat-cell', DummyUser.email).should('be.visible');
    cy.get('mat-table').contains('mat-cell', '20').should('be.visible');
    cy.get('mat-table').contains('mat-cell', DummyUser.gender).should('be.visible');
    cy.get('mat-table').contains('mat-cell', DummyUser.address).should('be.visible');
  });

  it('should show error when password have no symbol', () => {
    cy.visit(url);
    fillForm({ ...DummyUser, password: '1234adsfdAS', confirmPassword: '1234adsfdAS' });

    cy.get('#submit').click();

    cy.get('mat-error').should('contain', ValidationPattens.hasSymbol.errorMsg);
  });

  it('should show error message when password not have uppercase letter', () => {
    cy.visit(url);
    fillForm({ ...DummyUser, password: '123123!asd', confirmPassword: '123123!asd' });

    cy.get('#submit').click();

    cy.get('mat-error').should('contain', ValidationPattens.hasUpperCase.errorMsg);
  });

  it('should show error message when confirm password is not match', () => {
    cy.visit(url);
    fillForm({ ...DummyUser, password: '123123!asd123123', confirmPassword: '123123!asd' });

    cy.get('#submit').click();

    cy.get('mat-error').should('contain', 'The passwords do not match');
  });

  it('should show an error message when the user is younger than 18y', () => {
    cy.visit(url);
    fillForm({ ...DummyUser, dateOfBirth: '01/01/2018' });

    cy.get('#submit').click();

    cy.get('mat-error').should('contain', 'You must be over 18 years of age');
  });

  it('should show an error message when the month is lager than 12', () => {
    cy.visit(url);
    fillForm({ ...DummyUser, dateOfBirth: '01/14/2018' });

    cy.get('#submit').click();

    cy.get('mat-error').should('contain', 'The field must be in the format dd/mm/yyyy');
  });

  it('should show an error message when the date is lager than 31', () => {
    cy.visit(url);
    fillForm({ ...DummyUser, dateOfBirth: '39/14/2000' });

    cy.get('#submit').click();

    cy.get('mat-error').should('contain', 'The field must be in the format dd/mm/yyyy');
  });

  it('should show an error message when date is in the future', () => {
    cy.visit(url);
    fillForm({ ...DummyUser, dateOfBirth: '01/14/2028' });

    cy.get('#submit').click();

    cy.get('mat-error').should('contain', 'The field must be in the format dd/mm/yyyy');
  });
});
