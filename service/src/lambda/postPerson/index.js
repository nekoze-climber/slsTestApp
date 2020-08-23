"use strict";
var AWS = require("aws-sdk");
AWS.config.update({ region: process.env.region });
var docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
var PersonTable = require("../../aws/personTable");
var Validator = require("../../util/validator");

module.exports.handler = async (event, context, callback) => {
  const personTable = new PersonTable(docClient);
  const validator = new Validator();
  try {
    if (!validator.checkPersonBody(JSON.parse(event.body))) {
      const errorModel = {
        errorCode: "STA00002",
        errorMessage: "Invalid Body",
      };
      callback(null, {
        statusCode: 400,
        body: JSON.stringify({
          errorModel,
        }),
      });
    }
    const res = await personTable.postPerson(JSON.parse(event.body));
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(res),
    });
  } catch (err) {
    console.log("postPersonTable-index error");
  }
};
