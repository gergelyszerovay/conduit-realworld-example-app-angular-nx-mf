describe('shared-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=shareduicomponent--primary'));
  it('should render the component', () => {
    cy.get('conduit-shared-ui').should('exist');
  });
});
