const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  candidate: { type: String, required: true },
});

module.exports = mongoose.model('Vote', VoteSchema);
