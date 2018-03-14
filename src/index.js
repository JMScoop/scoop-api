/* eslint-disable no-console */
const logger = require('winston');
const app = require('./app');
const port = app.get('port');
// const server = app.listen(port);

// HTTPS version
const fs = require('fs');
const https = require('https');
const server = https.createServer({
  key:  fs.readFileSync('./api.jmuscoop.test.key'),
  cert: fs.readFileSync('./api.jmuscoop.test.cert'),
  requestCert: false,
  rejectUnauthorized: false
}, app).listen(port);
app.setup(server);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
);

// To set up SSL:
// see: https://www.kevinleary.net/self-signed-trusted-certificates-node-js-express-js/
// $ openssl genrsa -out api.jmuscoop.test.key 2048
// $ openssl req -new -x509 -key api.jmuscoop.test.key -out api.jmuscoop.test.cert -days 3650 -subj /CN=api.jmuscoop.test
