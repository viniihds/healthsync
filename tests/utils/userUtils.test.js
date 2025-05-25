jest.mock('../../db');
const { dbConnection } = require('../../db');
const { createUser, getUser } = require('../../Utils/UserUtils');

describe('User Service', () => {
    let mockConn;

    beforeEach(() => {
        mockConn = {
            query: jest.fn(),
            end: jest.fn(),
        };
        dbConnection.mockResolvedValue(mockConn);
    });

    describe('getUser', () => {
        it('should return error if email or password is undefined', async () => {
            const result = await getUser({ email: undefined, password: 'pass' });
            expect(result).toBe('Something is wrong with your email or password');
        });

        it('should return error message if user not found', async () => {
            mockConn.query.mockResolvedValue([[]]);
            const result = await getUser({ email: 'a@a.com', password: '123' });
            expect(result).toBe('Email or Password is incorrect');
        });

        it('should return user data if found', async () => {
            const fakeUser = [{ CDUSER: 1, NMUSER: 'John', EMAIL: 'john@example.com', PASSWORD: '123' }];
            mockConn.query.mockResolvedValue([fakeUser]);
            const result = await getUser({ email: 'john@example.com', password: '123' });
            expect(result).toEqual(fakeUser.at());
        });
    });

    describe('createUser', () => {
        it('should return error if user already exists', async () => {
            mockConn.query.mockResolvedValueOnce([[{ exists: 1 }]]);
            const result = await createUser({ email: 'john@example.com', name: 'John', password: '123' });
            expect(result).toBe('User with email: john@example.com already exists');
        });

        it('should create user and return user info', async () => {
            mockConn.query
                .mockResolvedValueOnce([[]])
                .mockResolvedValueOnce([{ insertId: 1 }])
                .mockResolvedValueOnce([[{ CDUSER: 1, NMUSER: 'John', EMAIL: 'john@example.com' }]])
                .mockResolvedValueOnce([[{ CDUSER: 1 }]])
                .mockResolvedValueOnce([]);

            const result = await createUser({ email: 'john@example.com', name: 'John', password: '123' });

            expect(result).toEqual([{ CDUSER: 1, NMUSER: 'John', EMAIL: 'john@example.com' }]);
        });
    });
});
