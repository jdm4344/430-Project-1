const polls = {
  'Test Poll': {
    name: 'Test Poll',
    id: '0',
    size: 2,
    options: ['Option 1', 'Option 2'],
    votes: [2, 1],
    responses: 1,
  },
};

let pollID = 0;

// Creates a new poll and saves it to the polls object
const addPoll = (name, size, options) => {
  let responseCode = 201;
  // Do split on options parameter b/c it is converted from arr to str when sent
  // from jsonResponses for some reason
  const optArr = options.split(',');

  // Check if a poll with the given name already exists, if not create a new poll
  if (polls[name]) {
    polls[name].size = size;

    // Update options
    polls[name].options = [];

    for (let i = 0; i < size; i++) {
      polls[name].options.push(optArr[i]);
    }

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
  pollID++;
  polls[name].id = pollID;
  polls[name].size = size;
  polls[name].options = []; // Will be array of strings
  // Save options
  for (let i = 0; i < size; i++) {
    polls[name].options.push(optArr[i]);
  }

  polls[name].votes = null; // Will be array of ints corresponding to the options
  polls[name].responses = 0;

  return responseCode;
};

// Saves vote results to the associated poll
const castVote = (name, votes) => {
  if (polls[name]) {
    if(polls[name].votes === null){
      console.dir("does not exist");
      polls[name].votes = [];
      for (let i = 0; i < polls[name].size; i++) {
        polls[name].votes.push(votes[i]);
      }
    } else {
      // console.dir("exists");
      console.dir(votes);
      for (let i = 0; i < polls[name].size; i++) {
        polls[name].votes[i] += votes[i];
      }
    }
    return 204;
  }
  return 400;
};

// Returns the polls object
const getPolls = () => polls;

// Retrieves a poll by name
const getPoll = (name) => {
  let pollObj = null;

  if (polls[name]) {
    pollObj = polls[name];
  }

  return pollObj;
};

module.exports = {
  addPoll,
  castVote,
  getPolls,
  getPoll,
};
