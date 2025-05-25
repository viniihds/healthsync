jest.mock('../../../db');
const { dbConnection } = require('../../../db');
const { getUser } = require('../../../services/login/loginService');

describe('getUser', () => {
    let mockConn;

    beforeEach(() => {
        mockConn = {
            query: jest.fn(),
            end: jest.fn(),
        };
        dbConnection.mockResolvedValue(mockConn);
    });

    it('should return error message if user is undefined', async () => {
        const result = await getUser(undefined);
        expect(result).toBe('Something went wrong while searching for your user');
    });

    it('should return user if found', async () => {
        const fakeUser = [{ CDUSER: 1, NMUSER: 'João', PASSWORD: '123' }];
        mockConn.query.mockResolvedValue([fakeUser]);

        const result = await getUser({ email: 'joao@email.com', password: '123' });

        expect(result).toEqual(fakeUser);
        expect(mockConn.query).toHaveBeenCalledWith(
            'SELECT CDUSER, NMUSER, PASSWORD FROM USER WHERE EMAIL = ? AND PASSWORD = ?;',
            ['joao@email.com', '123']
        );
    });

    it('should return empty array if user not found', async () => {
        mockConn.query.mockResolvedValue([[]]);

        const result = await getUser({ email: 'nao@existe.com', password: 'sem' });

        expect(result).toEqual([]);
    });
});
