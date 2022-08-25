const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");

const authenticateToken = (req, res, next) => {
  const verifyJwt = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: "https://dev-u-gbqqbo.us.auth0.com/.well-known/jwks.json",
    }),
    audience: "https://concordiabootcamp/final_project",
    issuer: "https://dev-u-gbqqbo.us.auth0.com/",
    algorithms: ["RS256"],
  }).unless({ path: ["/api/test"] });

  verifyJwt();
  next();
};

module.exports = authenticateToken;
