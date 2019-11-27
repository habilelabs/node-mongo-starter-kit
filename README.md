# Node-mongo-starter-kit
Node JS boiler plate using express JS.

### Prerequisites
```
    node, mongoDB
```

### Usage
* Run `npm i` to install all the dependencies.
* Start mongoDB server.
* Add `.env` file to the root of this project with following configuration.
```
PORT=<Port of your choice>
ENV=<Environment development/production>
SECRET=<Some strong secret>
MONGO_URI=<Mongo DB uri>
```
* Run `npm start` to run the server.

### Test
This app uses `jest` for unit testing.

To run test-cases, run `npm test`.

## Built With

The app is built using the following components.

*  [MongoDB](https://www.mongodb.com/)
*  [Express](https://expressjs.com/)
*  [Node.js](https://nodejs.org/)
