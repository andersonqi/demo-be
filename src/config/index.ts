import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgres: {
      database: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      password: process.env.POSTGRES_PASSWORD,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
    },
    jwt: {
      expiration: process.env.ACCESS_TOKEN_EXPIRATION,
      refreshExpiration: process.env.REFRESH_TOKEN_EXPIRATION,
      refreshSecret: process.env.REFRESH_TOKEN_SECRET,
      secret: process.env.ACCESS_TOKEN_SECRET,
      emailSecret: process.env.TOKEN_SECRET_EMAIL,
      emailExpiration: process.env.TOKEN_EXPIRATION_EMAIL,
    },
    frontend: {
      webapp: process.env.WEBAPP_URL,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    },
  };
});
