const request = require('supertest');
const app = require('../../app');

describe('Login and signup flow', () => {
    const timestamp = Date.now();
    const user = {
        name: 'Test User',
        email: `testuser_${timestamp}@example.com`,
        password: 'password123'
    };

    it('should register a new user successfully', async () => {
        const res = await request(app)
            .post('/login')
            .type('form')
            .send({
                type: 2,
                name: user.name,
                email: user.email,
                password: user.password
            });

        console.log('Signup response:', res.status, res.text);
        expect(res.status).toBe(302);
        expect(res.headers.location).toBe('/home');
    });

    it('should log in with registered user', async () => {
        const res = await request(app)
            .post('/login')
            .type('form')
            .send({
                type: 1,
                email: user.email,
                password: user.password
            });

        console.log('Login response:', res.status, res.text);
        expect(res.status).toBe(302);
        expect(res.headers.location).toBe('/');
    });

    it('should return error when registering with existing email', async () => {
        const res = await request(app)
            .post('/login')
            .type('form')
            .send({
                type: 2,
                name: user.name,
                email: user.email,
                password: user.password
            });

        console.log('Re-registration response:', res.status, res.text);
        expect(res.text.toLowerCase()).toContain('already exists');
    });
});
