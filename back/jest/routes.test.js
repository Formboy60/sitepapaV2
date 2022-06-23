const request = require ('supertest')


describe('Test endpoint', () => {
    test('should return 200', async () => {
      const res = await request("http://localhost:3000")
        .get('/projet')
      expect(res.status).toEqual(200)     
    })

    test('should return 403 ', async () => {
      const res = await request("http://localhost:3000")
        .post('/projet/arbres')
      expect(res.status).toEqual(403)     
    })
  })

  