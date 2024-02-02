describe('Star war application End to End testing', () => {
  it('visit local host ', () => {
    cy.visit('http://localhost:3000/')
    cy.get('h2').should('contain', 'Star War  Heros')

  })

  it('clicks on the character card and navigates to the details page', () => {
    cy.visit('http://localhost:3000/')

    cy.get('.character-card').should('be.visible');

    cy.get('.character-card:first-child').click();

    cy.url().should('include', '/character/1');

   
  });

describe('Hero Details Page', () => {
  it('displays hero details correctly', () => {
    cy.visit('http://localhost:3000/')
    cy.get('.character-card:first-child').click();
    cy.get('.hero-card').should('be.visible');
    cy.get('.hero-card h2').should('have.text', 'Luke Skywalker');
    cy.get('.hero-card p:contains("Hair Color:")').invoke('text').should('include', 'blond');
    cy.get('.hero-card p:contains("Eye Color:")').invoke('text').should('include', 'blue');
    cy.get('.hero-card p:contains("Gender:")').invoke('text').should('include', 'male');
    cy.get('.hero-card p:contains("Planet:")').invoke('text').should('include', 'Tatooine');
    cy.get('.hero-card h3:contains("Films:")').should('be.visible');
    cy.get('.hero-card ul li').should('have.length', 4);

  });
});


})

