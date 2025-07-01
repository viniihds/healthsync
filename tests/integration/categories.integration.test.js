jest.mock('../../Utils/SessionUtils.js', () => ({
    authMiddleware: (req, res, next) => next(),
}));

const request = require('supertest');
const app = require('../../app');

describe('Category API integration tests', () => {
    let insertedCategoryId;
    const categoryName = `Test Category ${Date.now()}`;

    it('GET /category should render the category page with categories', async () => {
        const res = await request(app)
            .get('/category')
            .expect(200);
        expect(res.text).toContain('Categoria');
        expect(res.text).toMatch(/<table/);
    });

    it('POST /category should create a new category and redirect', async () => {
        const res = await request(app)
            .post('/category')
            .send({ cdcategory: -1, nmcategory: categoryName })
            .expect(302);
        expect(res.headers.location).toBe('/category');
    });

    it('GET /category/fetchAll should return json array including new category', async () => {
        const res = await request(app)
            .get('/category/fetchAll')
            .expect(200)
            .expect('Content-Type', /json/);

        expect(Array.isArray(res.body)).toBe(true);
        const createdCategory = res.body.find(c => c.nmcategory === categoryName);
        expect(createdCategory).toBeDefined();

        if (createdCategory) insertedCategoryId = createdCategory.cdcategory;
    });

    it('DELETE /category should delete the category if no related meds', async () => {
        if (!insertedCategoryId) return;

        await request(app)
            .delete('/category')
            .send({ cdcategory: insertedCategoryId })
            .expect(200);
    });
});
