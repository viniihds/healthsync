jest.mock('../../../db');
const { dbConnection } = require('../../../db');
const { createUser } = require('../../../services/register/registerService');

describe('createUser', () => {
    let mockConn;

    beforeEach(() => {
        mockConn = {
            query: jest.fn(),
            end: jest.fn(),
        };
        dbConnection.mockResolvedValue(mockConn);
    });

    it('should return message if user already exists', async () => {
        mockConn.query.mockResolvedValueOnce([[{ exists: 1 }]]);

        const result = await createUser({ name: 'John', email: 'john@example.com', password: '123' });

        expect(result).toBe('User with email: john@example.com already exists');
    });

    it('should insert user and return result if user does not exist', async () => {
        mockConn.query
            .mockResolvedValueOnce([[]])
            .mockResolvedValueOnce([{ insertId: 1, affectedRows: 1 }]);

        const result = await createUser({ name: 'Jane', email: 'jane@example.com', password: 'abc' });

        expect(result).toEqual({ insertId: 1, affectedRows: 1 });
        expect(mockConn.query).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO USER'), ['Jane', 'jane@example.com', 'abc']);
    });

    it('should throw error if db insert fails', async () => {
        mockConn.query
            .mockResolvedValueOnce([[]])
            .mockRejectedValue(new Error('DB error'));

        await expect(
            createUser({ name: 'Alice', email: 'alice@example.com', password: 'xyz' })
        ).rejects.toThrow('DB error');
    });
});
