jest.mock('../../../db');
const { dbConnection } = require('../../../db');
const { getAdmin } = require('../../../services/admin/adminService');
const permissionEnum = require('../../../enums/permissionEnum');

describe('getAdmin', () => {
    let mockConn;

    beforeEach(() => {
        mockConn = {
            query: jest.fn(),
            end: jest.fn(),
        };
        dbConnection.mockResolvedValue(mockConn);
    });

    it('should return error message if user is undefined', async () => {
        const result = await getAdmin(undefined);
        expect(result).toBe('Something went wrong while searching for your user');
    });

    it('should return empty array if user is not admin', async () => {
        mockConn.query.mockResolvedValue([[]]);
        const result = await getAdmin({ email: 'user@example.com', password: '123' });
        expect(result).toEqual([]);
    });

    it('should return user if user is admin', async () => {
        const fakeAdminUser = [{ CDUSER: 1, NMUSER: 'Admin', PASSWORD: '123' }];
        mockConn.query.mockResolvedValue([fakeAdminUser]);

        const result = await getAdmin({ email: 'admin@example.com', password: '123' });

        expect(result).toEqual(fakeAdminUser);
        expect(mockConn.query).toHaveBeenCalledWith(expect.stringContaining('SELECT'), ['admin@example.com', '123']);
    });
});
