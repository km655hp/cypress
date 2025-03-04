describe('GET all posts API Test Suite', () => {
  it("Response status should be 200", () => {
    cy.api("GET", "https://jsonplaceholder.typicode.com/posts").should((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Response time should be less than 500ms", () => {
    cy.api("GET", "https://jsonplaceholder.typicode.com/posts").should((response) => {
      expect(response.duration).to.be.below(500);
    });
  });

  it("Response body should be an array", () => {
    cy.api("GET", "https://jsonplaceholder.typicode.com/posts").should((response) => {
      expect(response.body).to.be.an("array");
    });
  });

  it("Response body should have specific properties", () => {
    cy.api("GET", "https://jsonplaceholder.typicode.com/posts").should((response) => {
      expect(response.body[0]).to.have.property("userId");
      expect(response.body[0]).to.have.property("id");
      expect(response.body[0]).to.have.property("title");
      expect(response.body[0]).to.have.property("body");
    });
  });

  it("Response body should have specific data types", () => {
    cy.api("GET", "https://jsonplaceholder.typicode.com/posts").should((response) => {
      expect(response.body[0].userId).to.be.a("number");
      expect(response.body[0].id).to.be.a("number");
      expect(response.body[0].title).to.be.a("string");
      expect(response.body[0].body).to.be.a("string");
    });
  });

  it("Content-type header should be application/json", () => {
    cy.api("GET", "https://jsonplaceholder.typicode.com/posts").should((response) => {
      expect(response.headers["content-type"]).to.include("application/json");     
    });
  });

});