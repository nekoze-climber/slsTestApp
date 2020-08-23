"use strict";
var Validator = require("../src/util/validator");

const queryResultSuccess = {
  Items: [{ name: "taro" }],
};

const queryResultEmpty = {
  Items: {},
};

const postPersonBodySuccess = {
  name: "taro",
  age: "22",
  weight: "70",
  height: "180",
};

const postPersonBodyFaliure = {
  age: "22",
  weight: "70",
  height: "180",
};

const emptyObject = {};

describe("Test of validator.checkDyanmoQueryResultEmpty", () => {
  it("not empty case", () => {
    const validator = new Validator();
    const result = validator.checkDyanmoQueryResultEmpty(queryResultSuccess);
    expect(result).toEqual(false);
  });

  it("empty case", () => {
    const validator = new Validator();
    const result = validator.checkDyanmoQueryResultEmpty(queryResultEmpty);
    expect(result).toEqual(true);
  });
});

describe("Test of validator.checkPersonBody", () => {
  it("success case", () => {
    const validator = new Validator();
    const result = validator.checkPersonBody(postPersonBodySuccess);
    expect(result).toEqual(true);
  });

  it("failure case.lack of name attribute", () => {
    const validator = new Validator();
    const result = validator.checkPersonBody(postPersonBodyFaliure);
    expect(result).toEqual(false);
  });

  it("failure case.empty object", () => {
    const validator = new Validator();
    const result = validator.checkPersonBody(emptyObject);
    expect(result).toEqual(false);
  });
});
