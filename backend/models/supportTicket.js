const ticketSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  issue: { type: String, required: true },
  status: { type: String, enum: ['Open', 'In Progress', 'Closed'], required: true },
  dateRaised: { type: Date, required: true }
});

const SupportTicket = mongoose.model('SupportTicket', ticketSchema);
module.exports = SupportTicket;
