"use strict";
const uuid = require("uuid");

module.exports = class PersonTable {
  constructor(serviceClient) {
    this.client = serviceClient;
  }

  getPerson(personId) {
    const params = {
      TableName: process.env.PERSON_TABLE_NAME,
      KeyConditionExpression: "#hash = :personId",
      ExpressionAttributeNames: {
        "#hash": "personId",
      },
      ExpressionAttributeValues: {
        ":personId": personId,
      },
    };
    return new Promise((resolve, reject) => {
      this.client.query(params, (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log("getPerson Success!");
          resolve(data);
        }
      });
    });
  }

  postPerson(body) {
    const person = {
      ...body,
      personId: uuid.v4(),
    };
    const params = {
      TableName: process.env.PERSON_TABLE_NAME,
      Item: person,
    };
    console.log(params);
    return new Promise((resolve, reject) => {
      this.client.put(params, (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log("postPerson Success!");
          resolve(person);
        }
      });
    });
  }

  putPerson(personId, body) {
    const person = {
      ...body,
      personId: personId,
    };
    const params = {
      TableName: process.env.PERSON_TABLE_NAME,
      Key: {
        personId: person.personId,
        age: person.age,
      },
      UpdateExpression:
        "set #name = :name, #weight = :weight, #height = :height",
      ExpressionAttributeNames: {
        "#name": "name",
        "#weight": "weight",
        "#height": "height",
      },
      ExpressionAttributeValues: {
        ":name": person.name,
        ":weight": person.weight,
        ":height": person.height,
      },
    };
    console.log(params);
    return new Promise((resolve, reject) => {
      this.client.update(params, (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log("putPerson Success!");
          resolve(person);
        }
      });
    });
  }
  deletePerson(person) {
    const params = {
      TableName: process.env.PERSON_TABLE_NAME,
      Key: {
        personId: person.personId,
        age: person.age,
      },
    };
    console.log(params);
    return new Promise((resolve, reject) => {
      this.client.delete(params, (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log("deletePerson Success!");
          resolve(person);
        }
      });
    });
  }
};
