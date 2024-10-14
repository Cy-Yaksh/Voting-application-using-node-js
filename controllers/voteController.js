const Vote = require('../models/Vote');

// Render vote page
// exports.renderVote = (req, res) => {
//   res.render('vote');
// };
exports.renderVote = (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      return res.redirect('/login');
    }
  
    res.render('vote');
  };
  

// Handle voting
exports.vote = async (req, res) => {
  const { candidate } = req.body;
  const userId = req.session.userId;

  if (!userId) {
    return res.redirect('/login');
  }

  try {
    const existingVote = await Vote.findOne({ userId });
    if (existingVote) {
      res.render('vote', { error: 'You have already voted.' });
    } else {
      const newVote = new Vote({ userId, candidate });
      await newVote.save();
      res.redirect('/results');
    }
  } catch (err) {
    console.error('Voting error:', err);
    res.render('vote', { error: 'An error occurred.' });
  }
};

// Show results
exports.results = async (req, res) => {
  try {
    const results = await Vote.aggregate([
      { $group: { _id: '$candidate', count: { $sum: 1 } } }
    ]);
    res.render('results', { votingResults: results });
  } catch (err) {
    console.error('Error fetching results:', err);
    res.render('results', { error: 'An error occurred while fetching results' });
  }
};
