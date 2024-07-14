const queries = require("../fixtures/queries.json");

describe("connect to test db", () => {
  it("can connect to the db and create the table if it does not exist", () => {
    cy.task("queryDb", queries.createTable);
  });

  it("should insert entries into the table", () => {
    cy.task("queryDb", queries.insertData).then((result) => {
      expect(result.affectedRows).to.eql(5);
    });
  });

  it("should select students from Budapest", () => {
    cy.task(
      "queryDb",
      `SELECT FirstName FROM Students WHERE City = "Budapest"`
    ).then((result) => {
      expect(result).to.deep.include({ FirstName: "Anna" });
    });
  });

  it("should select all students from group 02-2023", () => {
    cy.task(
      "queryDb",
      `SELECT FirstName FROM Students WHERE StudentGroup = "02-2023"`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result.length).to.eql(3);
      const expectedNames = ["Andrey", "James", "Anna"];
      const actualNames = result.map((row) => row.FirstName);
      expectedNames.forEach((name) => expect(actualNames).to.include(name));
    });
  });

  it("delete table", () => {
    cy.task("queryDb", queries.deleteTable);
  });
});
