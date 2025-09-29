const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/bundle.js': htmlHandler.getBundle,
  // '/client.js': htmlHandler.getJS,
  '/getUsers': jsonHandler.getUsers,
  '/addUser': jsonHandler.addUser,
  '/notReal': jsonHandler.notReal,
  notFound: jsonHandler.notFound,
};

const onRequest = (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, HEAD');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  // handle preflight requests
  if (request.method === 'OPTIONS') {
    response.writeHead(204);
    return response.end();
  }
  const protocol = request.connection.encrypted ? 'https' : 'http';
  const parsedURL = new URL(request.url, `${protocol}://${request.headers.host}`);

  request.query = Object.fromEntries(parsedURL.searchParams);

  const handler = urlStruct[parsedURL.pathname] || urlStruct.notFound;
  handler(request, response, request.query);
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1:${port}`);
