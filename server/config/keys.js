module.exports = {
    pgUser: process.env.PSGUSER,
    pgHost: process.env.PGHOST,
    pgDatabase: process.env.PGDATABASE,
    pgPassword: process.env.PGPASSWORD,
    pgPort: process.env.PGPORT,
    jwtSecret: process.env.JWTSECRET,
    jwtRefreshSecret: process.env.JWTREFRESHSECRET,
    jwtExpiration: process.env.JWTEXPIRATION
}