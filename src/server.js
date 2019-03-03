const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Handles POST request for creating or updateing users
const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/addPoll') {
    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    request.on('data', (chunk) => {
      // console.dir(`chunk ${chunk}`);
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);
      // console.dir(bodyParams);
      jsonHandler.addPoll(request, response, bodyParams);
    });
  }
};

// Handles GET requests, returns client, css, or users
const handleGet = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/' || parsedUrl.pathname === '/client.html') {
    htmlHandler.getIndex(request, response);
  } else if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCSS(request, response);
  } else if (parsedUrl.pathname === '/getPolls') {
    jsonHandler.getPolls(request, response);
  } else if (parsedUrl.pathname === '/getPoll') {
    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    request.on('data', (chunk) => {
      // console.dir(`chunk ${chunk}`);
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);
      // console.dir(bodyParams);
      jsonHandler.getPoll(request, response, bodyParams);
    });
  } else {
    jsonHandler.notFound(request, response);
  }
};

// Handles head requests
const handleHead = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/getPoll') {
    jsonHandler.getPolls(request, response, true);
  } else {
    jsonHandler.notFound(request, response, true);
  }
};

// Determines response to send based on request
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  switch (request.method) {
    case 'POST':
      // console.dir('POST requested');
      handlePost(request, response, parsedUrl);
      break;
    case 'GET':
      // console.dir('GET requested');
      handleGet(request, response, parsedUrl);
      break;
    case 'HEAD':
      // console.dir('HEAD requested');
      handleHead(request, response, parsedUrl);
      break;
    default:
      break;
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
