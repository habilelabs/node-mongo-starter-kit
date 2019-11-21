const mongoose = require("mongoose");
const { AppError } = require(__basedir + '/errors');
const { constants } = require(__basedir + '/config');
const { getUserData } = require('./getUserData');

const { LOG_LEVELS, ERROR } = constants;

jest.mock(__basedir + '/db/controllers/users', () => ({
    getUserById: jest.fn(),
}));

const { getUserById } = require(__basedir + '/db/controllers/users');

beforeEach(() => {
    // Clear all mocks
    getUserById.mockClear();
});

describe('getUserById happy path', () => {

    it('should return user info', async () => {
        const userId = "some-id";
        const user = {
            name: "user",
            email: "user@gmail.com",
            age: 18,
            _id: userId
        };

        getUserById.mockResolvedValue(user);

        try {
            const data = await getUserData(userId);
            expect(getUserById).toHaveBeenCalledTimes(1);
            expect(getUserById).toHaveBeenCalledWith(userId);
            expect(data).toMatchObject(user);
        } catch (err) {
            console.log(err);
            throw err;
        }
    });
});

describe('getUserById error path', () => {

    it('should throw error if user not found', async () => {
        const userId = "some-id";

        getUserById.mockResolvedValue(null);

        try {
            await getUserData(userId);
            expect(getUserById).toHaveBeenCalledTimes(1);
            expect(getUserById).toHaveBeenCalledWith(userId);
        } catch (err) {
            expect(err).toEqual(new AppError(LOG_LEVELS.ERROR, ERROR.NOT_FOUND.TYPE, "User not found.", ERROR.NOT_FOUND.CODE, true));
        }
    });

    it('should throw an error when mongoDB throws', async () => {
        const mongoError = 'some-mongo-error';
        getUserById.mockImplementation(() => Promise.reject(new Error(mongoError)));
        const userId = "some-id";
        try {
            await getUserById(userId);
        } catch (err) {
            expect(err).toMatchSnapshot();
            expect(getUserById).toHaveBeenCalledTimes(1);
        }
    });
});