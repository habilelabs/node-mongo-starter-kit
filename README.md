# Node-mongo-starter-kit
Node JS boiler plate using express JS and mongoDB created with best practices for Nodejs.

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
SECRET=<Some strong secret, a string>
IS_CLUSTERING_ENABLED=<Boolean true/false>
ENABLE_ACCESS_LOGS=<Boolean true/false>
ENABLE_DEBUG_LOGS=<Boolean true/false>
MONGO_URI=<Mongo DB uri>
```
* Run `npm start` to run the server.

### Folder Structure
```bash
├───config                            # App related configuration
├───db                                # Contains Database models and controllers  
│   ├───controllers
│   └───models
├───errors                            # App error and logger files For error handling  
├───logs                              # Contains combined and error log file  
├───middlewares                       # Middlewares for endpoint 
├───modules                           # Module wise source files of app and unit tests (alternatively `spec`)  
│   └───user
│       └───actions
│           ├───addUserData
│           │   └───__snapshots__
│           └───getUserData
│               └───__snapshots__
├───.env                              # Conatins environment variables of app  
├───.eslintrc                         # Eslint configuarations   
├───app.js                            # Create and expose express app instance  
├───index.js                          # Entry file, responsible for instantiating the server  
├───jest.config.js                    # Jest test cases configuration  
├───package.json                      # npm packages   
├───package-lock.json
├───server.js                         # Creates HTTP server  
├───swagger.js                        # Configure and initialize swagger      

```

### Test
This app uses `jest` for unit testing.

To run test-cases, run `npm test`.

### API Documentations
This app uses `swagger` for API docs.

Documentation can be found at `/api/v1/api-docs`

## Built With

The app is built using the following components.

*  [MongoDB](https://www.mongodb.com/)
*  [Express](https://expressjs.com/)
*  [Node.js](https://nodejs.org/)
