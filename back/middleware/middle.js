require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });


const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");

const {
  getAuth
} = require("firebase-admin/auth");



initializeApp({
  credential: cert({
    "type": "service_account",
  "project_id": `${process.env.PROJETID}`,
  "private_key_id": `${process.env.IDPRIVATEKEY}`,
  "private_key": `${process.env.PRIVATEKEY.replace(/\\n/g, '\n')}`,
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
