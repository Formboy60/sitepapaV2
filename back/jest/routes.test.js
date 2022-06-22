const request = require ('supertest')
const express = require ('express')
const router = require ('../route.js')

const app = new express()
app.use('/', router)

describe('Test endpoint', () => {
    test('should return 200', async () => {
      const res = await request(app)
        .get('/projet')
      expect(res.status).toEqual(200)
     
    })
  })