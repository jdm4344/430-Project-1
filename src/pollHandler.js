const polls = {
  'Test Poll': {
    name: 'Test Poll',
    size: 2,
    options: ['Option 1', 'Option 2'],
    votes: [2, 1],
    responses: 1,
  },
};

// Creates a new poll and saves it to the polls object
const addPoll = (name, size, options) => {
  let responseCode = 201;

  // Check if a poll with the given name already exists, if not create a new poll
  if (polls[name]) {
    polls[name].size = size;
    polls[name].options = options;
    // Don't overwrite votes
    responseCode = 204;
  } else {
    polls[name] = {};
  }

  // Assign values to poll
  // Make sure a name was given, if not generate one
  if (!name || name === null || name === '') {
    polls[name].name = `Poll #${Object.keys(polls).length}`;
  } else {
    polls[name].name = name;
  }
  polls[name].size = size;
  polls[name].options = options; // Will be array of strings
  polls[name].votes = []; // Will be array of ints corresponding to the options
  polls[name].responses = 0;

  return responseCode;
};

const castVote = (name) => {
  
};

// Returns the polls object
const getPolls = () => { console.dir(polls); return polls; };

module.exports = {
  addPoll,
  getPolls,
  castVote,
};
