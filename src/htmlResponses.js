const fs = require('fs');
const path = require('path');

// HELPER - serve static file
const serveFile = (response, filepath, contentType) => {
    const absPath = path.resolve(__dirname, filepath);

    fs.readFile(absPath, (err, fileData) => {
        if (err) {
            console.error(`Error reading ${filepath}:`, err);
            response.writeHead(404, {'Content-Type':'application/json'});
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
        response.end(fileDate);
    });
};

// Handlers

const getIndex = (request, response) => {
    serveFile(response, '../client/client.html', 'text/html');
};

const getCSS = (request, response) => {
    serveFile(response, '../client/style.css', 'text/css');
};

const getJS = (request, response) => {
    serveFile(response, '../client/client.js', 'application/javascript');
};

// const index = fs.readFileSync(`${__dirname}/../client/client.html`);
// const css = fs.readFileSync(`${__dirname}/../client/style.css`);
// const js = fs.readFileSync(`${__dirname}/../src/client.js`);

// const getIndex = (request, response) => {
//   response.writeHead(200, { 'Content-Type': 'text/html' });
//   response.write(index);
//   response.end();
// };

// const getCSS = (request, response) => {
//   response.writeHead(200, { 'Content-Type': 'text/css' });
//   response.write(css);
//   response.end();
// };

// const getJS = (request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/javascript' });
//   response.write(js);
//   response.end();
// };

module.exports = {
  getIndex,
  getCSS,
  getJS,
};
