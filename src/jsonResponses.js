const users = {};

//HELPER - decides response type
const getType = (request) => {
  const accept = request.headers.accept || '';
  if (accept.includes('application/xml')) {
    return 'xml';
  }
  return 'json';
};

//const getType = (request) => 'json';

// HELPER - builds message response
const buildMessage = (state, message, type, isError = false, extra = {}) => {
  if (type === 'json') {
    const body = isError ? { message, id: state, ...extra } : { message, ...extra };
    return JSON.stringify(body);
  }

  // XML response
  let xml = `<response><message>${message}</message>`;
  if (isError) xml += `<id>${state}</id>`;
  for (const [key, val] of Object.entries(extra)) {
    xml += `<${key}>${val}</${key}`;
  }
  xml += '</response>';
  return xml;
};

// HELPER - general responder
// const respond = (
//     request, response, statusCode, statusName, message, isError = false, extra = {}
// ) => {
//   const type = getType(request);
//   const body = buildMessage(statusName, message, type, isError, extra);

//   response.writeHead(statusCode, {
//     'Content-Type': type === 'json' ? 'applicatiion/json' : 'application/xml',
//   });
//   response.write(body);
//   response.end();
// };

const respond = (request, response, statusCode, statusName, message, isError = false, extra = {}) => {
    const body = {
      statusName,
      message,
      ...extra,
    };
  
    response.writeHead(statusCode, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(body));
    response.end();
  };
  

// GET/HEAD /getUsers
const getUsers = (request, response) => {
  if (request.method === 'HEAD') {
    return respond(request, response, 200, 'success', '', false);
  }
  return respond(request, response, 200, 'success', 'Users retrieved successfully.', false, users);
};

// POST /getUsers
const addUser = (request, response) => {
    if (request.method !== 'POST') {
      return respond(request, response, 405, 'methodNotAllowed', 'Only POST is allowed.');
    }
  
    let body = '';
    request.on('data', (chunk) => { body += chunk; });
    request.on('end', () => {
      let parsed;
      try { parsed = JSON.parse(body); } 
      catch (e) { return respond(request, response, 400, 'badJSON', 'Invalid JSON body.'); }
  
      const { name, age } = parsed;
      if (!name || !age) {
        return respond(request, response, 400, 'missingParams', 'Missing name or age.');
      }
  
      if (users[name]) {
        users[name].age = age;
        return respond(request, response, 204, 'updated', `User ${name} updated successfully.`);
      }
  
      users[name] = { name, age };
      return respond(request, response, 201, 'created', `User ${name} created successfully.`);
    });
  };

// /notReal
const notReal = (request, response) => {
  if (request.method === 'HEAD') {
    return respond(request, response, 404, 'not Real', '', true);
  }
  return respond(request, response, 404, 'notReal', 'This endpoint does not exist.', true);
};

// cathch-all 404
const notFound = (request, response) => {
  if (request.method === 'HEAD') {
    return respond(request, response, 404, 'notFound', '', true);
  }
  return respond(request, response, 404, 'notFound', 'Resources not found.', true);
};

module.exports = {
  getUsers,
  addUser,
  notReal,
  notFound,
};
