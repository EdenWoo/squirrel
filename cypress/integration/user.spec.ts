import { DummyUser } from '../fixtures/dummy-user';

describe('USer Page', () => {
  before(() => {
    cy.visit('localhost:4200');
  });
  it('check the title', () => {
    cy.get('title').invoke('text').should('equal', 'Squirrel');
  });

  it('should add user when submit valid form', () => {
    cy.get('[data-testid=fullName]').clear().type(DummyUser.fullName);
    cy.get('[data-testid=email]').clear().type(DummyUser.email);
    cy.get('[data-testid=password]').clear().type(DummyUser.password);
    cy.get('[data-testid=confirmPassword]').clear().type(DummyUser.confirmPassword);
    cy.get('[data-testid=dateOfBirth]').clear().type(DummyUser.dateOfBirth);
    cy.get('[type="radio"]').first().check({ force: true });
    cy.get('[data-testid=address]').clear().type(DummyUser.address);

    cy.get('#submit').click();

    cy.get('mat-table').contains('mat-cell', DummyUser.fullName).should('be.visible');
    cy.get('mat-table').contains('mat-cell', DummyUser.email).should('be.visible');
    cy.get('mat-table').contains('mat-cell', '20').should('be.visible');
    cy.get('mat-table').contains('mat-cell', DummyUser.gender).should('be.visible');
    cy.get('mat-table').contains('mat-cell', DummyUser.address).should('be.visible');
  });
});
