const polls = {};

// Creates a new poll and saves it to the polls object
const addPoll = (name, size=2, options) => {
  // Make sure the poll has a name
  if(name === null){
    name = `Poll #${Object.keys(polls).length + 1}`;
  }
    
  const newPoll = {
    name: name,
    size: size,
    options: options,
  }
};

// Returns the polls object
const getPolls = () => {
  return polls;
};

module.exports = {
  addPoll,
  getPolls,
}