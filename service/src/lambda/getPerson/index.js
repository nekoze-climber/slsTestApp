"use strict";
var AWS = require("aws-sdk");
AWS.config.update({ region: process.env.region });
var docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
var PersonTable = require("../../aws/personTable");
var Validator = require("../../util/validator");
var Formatter = require("../../util/formatter");

module.exports.handler = async (event, context, callback) => {
  const personTable = new PersonTable(docClient);
  const validator = new Validator();
  const formatter = new Formatter();
  try {
    const res = await personTable.getPerson(event.pathParameters.personId);
    if (validator.checkDyanmoQueryResultEmpty(res)) {
      const errorModel = {
        errorCode: "STA00001",
        errorMessage: "Not Found",
      };
      callback(null, {
        statusCode: 404,
        body: JSON.stringify({
          errorModel,
        }),
      });
    }
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(formatter.getPersonFormatter(res)),
    });
  } catch (err) {
    console.log("getPersonTable-index error");
  }
};
