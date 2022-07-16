var secret_key = process.env.SECRET_KEY_BYCRIPT!;

export default {
  jwt: {
    secret: secret_key,
    expiresIn: '365d'
  }
}