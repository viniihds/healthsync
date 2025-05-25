const { authMiddleware } = require('../../Utils/SessionUtils');

describe('authMiddleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {};
        res = {
            render: jest.fn(),
        };
        next = jest.fn();
    });

    afterEach(() => {
        global.user = undefined;
        jest.clearAllMocks();
    });

    it('should render login page if no user is logged in', () => {
        global.user = undefined;

        authMiddleware(req, res, next);

        expect(res.render).toHaveBeenCalledWith('login', { message: '' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should call next if user is logged in', () => {
        global.user = { id: 1, name: 'Admin' };

        authMiddleware(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(res.render).not.toHaveBeenCalled();
    });
});
