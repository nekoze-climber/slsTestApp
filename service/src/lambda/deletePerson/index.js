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
      callback(null, {
        statusCode: 200,
      });
    }
    const resDelete = await personTable.deletePerson(
      formatter.getPersonFormatter(res)
    );
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(resDelete),
    });
  } catch (err) {
    console.log("deletePersonTable-index error");
  }
};
