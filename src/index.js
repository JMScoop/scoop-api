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
// Update /etc/ssl/openssl.cnf in the virtual machine with the following:
// (from https://stackoverflow.com/questions/27294589/creating-self-signed-certificate-for-domain-and-subdomains-neterr-cert-commo)
//
// [ v3_req ]
// basicConstraints = CA:FALSE
// keyUsage = nonRepudiation, digitalSignature, keyEncipherment
// subjectAltName = @alt_names

// [ alt_names ]

// DNS.1 = jmuscoop.test
// DNS.2 = api.jmuscoop.test
// DNS.3 = *.jmuscoop.test
//
// see: https://www.kevinleary.net/self-signed-trusted-certificates-node-js-express-js/
// $ openssl genrsa -out api.jmuscoop.test.key 2048
// $ openssl req -new -x509 -key api.jmuscoop.test.key -out api.jmuscoop.test.cert -days 3650 -subj /CN=api.jmuscoop.test -extensions v3_req
//
// Finally,
// On Windows install the new certificate in the host OS following these instructions:
// https://success.outsystems.com/Support/Enterprise_Customers/Installation/Install_a_trusted_root_CA__or_self-signed_certificate
// You may have to restart Chrome and/or ionic serve to make it work
//
// On a Mac, install the new certificate in Keychain Access