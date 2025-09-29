const fs = require('fs');
const path = require('path');

// HELPER - serve static file
const serveFile = (response, filepath, contentType) => {
  const absPath = path.resolve(__dirname, filepath);

  fs.readFile(absPath, (err, fileData) => {
    if (err) {
      console.error(`Error reading ${filepath}:`, err);
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({
        message: 'File not found',
        id: 'missingFile',
      }));
      return;
    }

    response.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': Buffer.byteLength(fileData),
    });
    response.end(fileData);
  });
};

// Handlers

const getIndex = (request, response) => {
  serveFile(response, '../client/client.html', 'text/html');
};

const getCSS = (request, response) => {
  serveFile(response, '../client/style.css', 'text/css');
};

const getBundle = (request, response) => {
  serveFile(response, '../client/bundle.js', 'application/javascript');
};

module.exports = {
  getIndex,
  getCSS,
  getBundle,
};
