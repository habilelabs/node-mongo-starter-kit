const mongoose = require("mongoose");
const { AppError } = require(__basedir + '/errors');
const { constants } = require(__basedir + '/config');
const { addUserData } = require('./addUserData');

const { LOG_LEVELS, ERROR } = constants;

jest.mock(__basedir + '/db/controllers/users', () => ({
    createUser: jest.fn(),
    getUser: jest.fn(),
}));

jest.mock(__basedir + '/middlewares/auth', () => ({
    createToken: jest.fn(),
}));

const { createUser, getUser } = require(__basedir + '/db/controllers/users');
const { createToken } = require(__basedir + '/middlewares/auth');

beforeEach(() => {
    // Clear all mocks
    createUser.mockClear();
    getUser.mockClear();
    createToken.mockClear();
});

describe('createUser happy path', () => {

    it('should return created user with token', async () => {
        const userId = "some-id";
        const input = {
            name: "user",
            email: "user@gmail.com",
            age: 18
        };

        const token = "some-token";

        const query = { email: "user@gmail.com" };

        const outUser = {
            name: "user",
            email: "user@gmail.com",
            age: 18,
            _id: userId
        };

        const output = {
            user: outUser,
            token
        };

        createUser.mockResolvedValue(outUser);
        getUser.mockResolvedValue(null);
        createToken.mockResolvedValue(token);

        try {
            const data = await addUserData(input);
            expect(getUser).toHaveBeenCalledTimes(1);
            expect(getUser).toHaveBeenCalledWith(query);
            expect(createUser).toHaveBeenCalledTimes(1);
            expect(createUser).toHaveBeenCalledWith(input);
            expect(createToken).toHaveBeenCalledTimes(1);
            expect(createToken).toHaveBeenCalledWith(outUser);
            expect(data).toMatchObject(output);
        } catch (err) {
            console.log(err);
            throw err;
        }
    });
});

describe('createUser error path', () => {

    it('should throw error if user already exists', async () => {
        const query = { email: "user@gmail.com" };
        const userId = "some-id";

        const outUser = {
            name: "user",
            email: "user@gmail.com",
            age: 18,
            _id: userId
        };

        const input = {
            name: "user",
            email: "user@gmail.com",
            age: 18
        };

        getUser.mockResolvedValue(outUser);

        try {
            await addUserData(input);
            expect(getUser).toHaveBeenCalledTimes(1);
            expect(getUser).toHaveBeenCalledWith(query);
            expect(createUser).toHaveBeenCalledTimes(0);
            expect(createToken).toHaveBeenCalledTimes(0);
        } catch (err) {
            expect(err).toEqual(new AppError(LOG_LEVELS.ERROR, ERROR.BAD_REQUEST.TYPE, "User already exists.", ERROR.BAD_REQUEST.CODE, true));
        }
    });

    it('should throw an error when mongoDB throws', async () => {
        const mongoError = 'some-mongo-error';
        getUser.mockImplementation(() => Promise.reject(new Error(mongoError)));
        const userId = "some-id";
        const input = {
            name: "user",
            email: "user@gmail.com",
            age: 18
        };
        try {
            await addUserData(input);
        } catch (err) {
            expect(err).toMatchSnapshot();
            expect(getUser).toHaveBeenCalledTimes(1);
            expect(createUser).toHaveBeenCalledTimes(0);
            expect(createToken).toHaveBeenCalledTimes(0);
        }
    });
});