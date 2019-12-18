import { hashPass } from '../helpers/crypto'
let pass

const setPass = (adminPass: string): void => {
  pass = adminPass
}

const isCorrectCredentials = (password: string, correct: string): boolean => {
  const adminPassword = hashPass(password)
  const userPassword = hashPass(correct)
  return userPassword === adminPassword
}

const setupAuth = (req, res, next): void => {
  const { adminPass } = req.cookies
  const { authorization = '' } = req.headers

  if (authorization) {
    const isCorrect = isCorrectCredentials(authorization as string, pass)
    if (!adminPass && !isCorrect) res.status(401).send('Unauthorized')
    return next()
  }
  if (!adminPass) return res.render('login', { error: '' })
  return next()
}

export { setPass, setupAuth, isCorrectCredentials }
