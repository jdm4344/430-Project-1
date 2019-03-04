const pollHandler = require('./pollHandler.js');

// Helper method sending JSON response with a body
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

// Helper method sending JSON response without a body
const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// Returns an object of all poll objects
const getPolls = (request, response, isHead = false) => {
  // Check if a HEAD request was made, if so just send the status code
  if (isHead === true) {
    return respondJSONMeta(request, response, 200);
  }

  const responseJSON = {
    polls: pollHandler.getPolls(),
  };

  return respondJSON(request, response, 200, responseJSON);
};

const getPoll = (request, response, name) => {
  const responseJSON = {
    message: 'Poll with that name does not exist.',
  };

  // Get the requested poll from pollHandler
  const poll = pollHandler.getPoll(name);

  if (poll === null) {
    response.id = 'doesNotExist';
    return respondJSON(request, response, 400, responseJSON);
  }

  // If reached, poll exists -> send it back
  responseJSON.message = 'Retrieved Successfully';
  responseJSON.poll = poll;
  return respondJSON(request, response, 200, responseJSON);
};

// Creates a new poll or updates an existing one
// body is an object with the keys: name, size, options
// options is an array of strings which name an option that can be chosen in a poll
const addPoll = (request, response, body) => {
  // console.dir(pollHandler.getPolls());
  // console.dir(body);

  const responseJSON = {
    message: 'You must include at least 2 options with your poll',
  };

  // Make sure that all options have been filled out
  // use "object desctructuring" to prevent eslint error
  const { options } = body;

  for (let i = 0; i < body.size; i++) {
    if (!options[i] || options[i] === '' || options[i] === null) {
      response.id = 'missingOption';
      return respondJSON(request, response, 400, responseJSON);
    }
  }

  let responseCode = 201;

  // Create the new poll
  // pollHandler determines whether to create or update, will return appropriate response code
  responseCode = pollHandler.addPoll(body.name, body.size, options);

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

const castVote = (request, response, body) => {
  const responseJSON = {
    message: 'Poll with that name does not exist',
  };

  // Make sure that all options have been filled out
  // use "object desctructuring" to prevent eslint error
  const { votes } = body;

  let responseCode = 204;

  // Create the new poll
  // pollHandler determines whether to create or update, will return appropriate response code
  responseCode = pollHandler.castVote(body.name, votes);

  if (responseCode === 204) {
    responseJSON.message = 'Vote Cast Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

// Returns response for if the requested page does not exist
const notFound = (request, response, isHead = false) => {
  if (isHead === true) {
    return respondJSONMeta(request, response, 404);
  }
  const responseJSON = {
    message: 'The page you are looking for was not found.',
  };

  return respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  getPolls,
  getPoll,
  addPoll,
  castVote,
  notFound,
};
