const fs = require('fs');
const path = require('path');

const index = fs.readFileSync(path.resolve(_dirname, 'client.html'));
const css = fs.readFileSync(path.resolve(_dirname, 'style.css'));
const js = fs.readFileSync(path.resolve(_dirname, 'client.js'));

const getIndex = (request, response) => {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(index);
    response.end();
};

const getCSS = (request, response) => {
    response.writeHead(200, {'Content-Type': 'text/css'});
    response.write(css);
    response.end();
};

const getJS = (request, response) => {
    response.writeHead(200, {'Content-Type': 'application/javascript'});
    response.write(js);
    response.end();
};

module.exports = {
    getIndex,
    getCSS,
    getJS,
};