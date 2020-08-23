"use strict";
var AWS = require("aws-sdk");
AWS.config.update({ region: "ap-northeast-1" });
var docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
var PersonTable = require("../src/aws/personTable");

describe("Test of personTable.getPerson", () => {
  it("success case", async () => {
    const personTable = new PersonTable(docClient);
    const succ = {
      Items: { result: "result" },
    };
    docClient.query = jest.fn((params, cb) => {
      cb(null, succ);
    });
    const result = await personTable.getPerson("personId");
    expect(result).toEqual(succ);
  });

  it("failure case", async () => {
    const personTable = new PersonTable(docClient);
    const error = new Error("error");
    docClient.query = jest.fn((params, cb) => {
      cb(error);
    });
    const result = await personTable
      .getPerson("personId")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    expect(result).toEqual(error);
  });
});

describe("Test of personTable.postPerson", () => {
  it("success case", async () => {
    const personTable = new PersonTable(docClient);
    const succ = {
      Items: { result: "result" },
    };
    docClient.put = jest.fn((params, cb) => {
      cb(null, succ);
    });
    const result = await personTable.postPerson({ name: "taro" });
    expect(result).toEqual({ personId: expect.anything(), name: "taro" });
  });

  it("failure case", async () => {
    const personTable = new PersonTable(docClient);
    const error = new Error("error");
    docClient.put = jest.fn((params, cb) => {
      cb(error);
    });
    const result = await personTable
      .postPerson("personId")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    expect(result).toEqual(error);
  });
});

describe("Test of personTable.putPerson", () => {
  it("success case", async () => {
    const personTable = new PersonTable(docClient);
    const succ = {
      Items: { result: "result" },
    };
    docClient.update = jest.fn((params, cb) => {
      cb(null, succ);
    });
    const result = await personTable.putPerson("aaa", {
      age: "30",
      name: "taro",
      weight: "70",
      height: "180",
    });
    expect(result).toEqual({
      personId: "aaa",
      age: "30",
      name: "taro",
      weight: "70",
      height: "180",
    });
  });

  it("failure case", async () => {
    const personTable = new PersonTable(docClient);
    const error = new Error("error");
    docClient.update = jest.fn((params, cb) => {
      cb(error);
    });
    const result = await personTable
      .putPerson("personId")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    expect(result).toEqual(error);
  });
});

describe("Test of personTable.deletePerson", () => {
  it("success case", async () => {
    const personTable = new PersonTable(docClient);
    const succ = {
      Items: { result: "result" },
    };
    docClient.delete = jest.fn((params, cb) => {
      cb(null, succ);
    });
    const result = await personTable.deletePerson({
      personId: "aaa",
      age: "30",
      name: "taro",
      weight: "70",
      height: "180",
    });
    expect(result).toEqual({
      personId: "aaa",
      age: "30",
      name: "taro",
      weight: "70",
      height: "180",
    });
  });

  it("failure case", async () => {
    const personTable = new PersonTable(docClient);
    const error = new Error("error");
    docClient.delete = jest.fn((params, cb) => {
      cb(error);
    });
    const result = await personTable
      .deletePerson("personId")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    expect(result).toEqual(error);
  });
});
