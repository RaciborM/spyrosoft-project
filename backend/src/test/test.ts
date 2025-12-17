import request from 'supertest'
import app from '../app'

describe('Energy API', () => {
    it('GET /api/energy/mix should return 3 days', async () => {
        const res = await request(app).get('/api/energy/mix')

        expect(res.status).toBe(200)
        expect(Array.isArray(res.body)).toBe(true)
        expect(res.body.length).toBe(3)

        expect(res.body[0]).toHaveProperty('average')
        expect(res.body[0]).toHaveProperty('cleanPerc')
    })

    it('GET /api/energy/best-window?hours=3 return optimal window for charging', async () => {
        const res = await request(app).get('/api/energy/best-window').query({hours: 3})

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('start')
        expect(res.body).toHaveProperty('end')
        expect(res.body).toHaveProperty('averageCleanPerc')
    })
})