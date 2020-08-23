"use strict";
var Formatter = require("../src/util/formatter");

const getPersonResult = {
  Items: [
    {
      age: "28",
      height: "178",
      name: "tarou",
      personId: "aaa",
      weight: "70",
    },
  ],
};

const getPersonResultFormatted = {
  age: "28",
  height: "178",
  name: "tarou",
  personId: "aaa",
  weight: "70",
};

describe("Test of formatter.getPersonFormatter", () => {
  it("success case", () => {
    const formatter = new Formatter();
    const result = formatter.getPersonFormatter(getPersonResult);
    expect(result).toEqual(getPersonResultFormatted);
  });
});
