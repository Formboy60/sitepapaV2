const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");

const {
  getAuth
} = require("firebase-admin/auth");

const serviceAccount = require("../firebase/site-papa-408d2-firebase-adminsdk-8ftw9-07cba9bfb9.json");

initializeApp({
  credential: cert(serviceAccount),
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
        message: 'Veuillez vous connecter '
      })
    } else {
      next()
    }

  } else {
    res.status(403)
    res.json({
      message: 'Veuillez vous connecter '
    })
  }

}

module.exports = {
  isUser
}