const polls = {};

// Creates a new poll and saves it to the polls object
const addPoll = (name, size=2, options) => {
  let responseCode = 201;

  // Make sure a name was given, if not generate one
  if(!name || name === null || name  === ''){
    name = `Poll #${Object.keys(polls).length + 1}`;
  }

  // Check if a poll with the given name already exists, if not create a new poll
  if(polls[name]) { 
    polls[name].size = size;
    polls[name].options = options;
    
    responseCode = 204;
  }
  else {
    polls[name] = {};
  }
  
  // Assign values to poll
  polls[name].name = name;
  polls[name].size = size;
  polls[name].options = options; // Will be array of strings 
  polls[name].votes = []; // Will be array of ints corresponding to the options

  return responseCode;
};

// Returns the polls object
const getPolls = () => {
  return polls;
};

module.exports = {
  addPoll,
  getPolls,
}