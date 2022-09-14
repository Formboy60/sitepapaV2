const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");

const {
  getAuth
} = require("firebase-admin/auth");

// const serviceAccount = require("../firebase/site-papa-408d2-firebase-adminsdk-8ftw9-07cba9bfb9.json");

initializeApp({
  credential: cert({
    "type": "service_account",
  "project_id": `${process.env.PROJETID}`,
  "private_key_id": `${process.env.IDPRIVATEKEY}`,
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCUAjhmtZ/88Bdt\nuqMuuEJtj+Gv/JtgQtnjvNJOClgSBBtG2mTqJSVc+tmtZd6E8RWclJl5j3ocQJT2\n4ut1diH8cmD+7tRMts2NQjTumnpla3iEgikUQGINGzcohsRHwme5VRRQnMLvHM28\ncAFUtzkGzVogUnhu51WaagTApJuGGX3F0zOoV4DTZFP1RmIaXABoM7c0MO209Igl\nhJVlqJfcfg/UZRHL6WjJkilwxHbFkHfpQAUb0fyRiSZlAJACH2pj1Qir5WPecKD6\na6KvTWfmQ9gXAGAlxH/vEkrXj0IRbbcyk5xdgsFfUJIBP9iVOUFRSyyeu6ImWrN9\nTagU9gBTAgMBAAECggEAB+EqYYVv1AZwKN5Ty6vxlWWgjT70gqZsdSxbQd5ZG/Ru\nA1KjJrf9ijqslgejVg6DqQdcOFWEGbbyd0ZTZLh6TLdGJKxQTxk4TjnlGYLN21Ji\nYyOOzk4zKiF1yUmLb4qQ/RPjdfsygYpWBZ8s4vayKYOLNcdONBFKxGK6iAr7YKMs\nCucHhiccU8u1ntDipCQKk4nvqcLqWzIcIJTCXss0koDOJHhcW+XJf0mmvDJd9yHy\n18AXS4HxF/A6gJOck6JKTX/PifTT//PTMtHSKPWnu66YFM5DI46B/fFTXg3BmPRG\nrG9/bSIysYBMxzmC1CJYMZbzTMfdnTllWZAvcQqrAQKBgQDJj5EFbU/5Vu+kbV3r\n5JLgUlFuyEZnB1OCt7ZK51Vi6ckt7lWBNH8tXMZaZxU6LdwjkMwEbO1D+OCovv6q\ncQ/rBhMBTsb/OfJKAoZvPX2o62zBFYaVu2KbPXIjDbpjljAOnl3iRLk7lER0Hsf7\ngDEHpEGx4ELDHaAK7BK9zGDJgQKBgQC7++vcswWWGCbOTyc8Y9Bo+eQaN+zdi1RS\nfmWEavxOSIacGa3FQTDAchFwQB7AoM8c0usVn8LaEDu4EWr0z3APx9j96mi5QhzQ\nuJKVfNTCCWrhokkAW7vPFsjIFOIs3ZIQt5A04K8e8hUfBScTVMftFDCFskeumdxx\nBs77gndr0wKBgCX9KRgcwjX8bK5Q7qLHMeeVnEOE+7/vYY4BkhoL/8vkxEYj5Xm0\nq0OheMERLK8KdbM+VzV+Ujm9bppfZSA6rwVc37gfYOI5ybCpSS0uKcDsnlLF+9e8\nuZkIu7pfnAGpDOW0c31x9neEOmKoaoi8YIFQNBGScwLTUpa8Z8vd+WABAoGBAJxX\n10CEu76rc4relflJ4omMW8Pag2t2d7jsWq4Y9KJ++0VUrguCPnOv6wT6rxjyJY8J\ndG9Vog8OtTxPcC8PX1ogkj4L+PErJSAKgg9F9QU0I+pouGJN6RNBFdgiVkGOPe8d\nXBg+Tidkm2BjPq57MpPg2MI5FhkG6iouyXKwfXX1AoGAIgtMWbDSttQLz9tUAQrB\nYnYKPcPllxw5y+wS2DgRpN5twKZN3OE3o8R3ILaWPxImJ5QMN1UtXf/6glTjcyV9\ngLSpOOISjKWIdY4o/K1509oZvQWHQiPvqlG4c3CWPEGwGfERXmFqQB19r5/Z00pD\nltm5DowdhmZl6v0kD3RLpkY=\n-----END PRIVATE KEY-----\n",
  "client_email": `${process.env.CLIENTMAIL}`,
  "client_id": `${process.env.CLIENTID}`,
  "auth_uri": `${process.env.AUTHURI}`,
  "token_uri": `${process.env.TOKENURI}`,
  "auth_provider_x509_cert_url": `${process.env.PROVIDER}`,
  "client_x509_cert_url": `${process.env.CLIENT}`
  }),
});



async function getToken(token) {
  let response
  try {
    response = await getAuth().verifyIdToken(token)
    return response
  } catch (err) {

    return false
  }
}


async function isUser(req, res, next) {
  const token = req.headers.authorization

  if (token) {


    const isAuth = await getToken(token)

    if (!isAuth) {
      res.status(403)
      res.json({
        message: 'Veuillez vous connecter'
      })
    } else {
      next()
    }

  } else {
    res.status(403)
    res.json({
      message: 'Veuillez vous connecter'
    })
  }

}

module.exports = {
  isUser
}