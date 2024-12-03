TODO

Test for service: `curl -i -X POST -H "Content-Type:text/plain" -d "test" http://localhost:3030/api/v1/receive`



## [Certs](https://egghead.io/lessons/express-create-local-ssl-certificates-for-an-express-app-on-windows)
1) export dev cert
2) using openssl in git bash: ([openssl pass phrase](https://docs.openssl.org/1.0.2/man1/openssl/#pass-phrase-arguments))
   - export key: `openssl pkcs12 -in ./personal-jette.pfx -passin pass:<> -nocerts -out privatekey.pem -nodes`
   - export cert: `openssl pkcs12 -in ./personal-jette.pfx -passin pass:<> -nokeys -out publiccert.pem -nodes`
3) cert should probably be trusted on client
## oddity:
- can receive data, but returning a result causes cors error
- `Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://lms10-jette:3030/api/v1/receive. (Reason: CORS header ‘Access-Control-Allow-Origin’ missing). Status code: 200.`
TODO: figure out where to set this header in lms
## env
[use env vars in node](https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs)