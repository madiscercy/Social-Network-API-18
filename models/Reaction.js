const { Schema } = require('mongoose');

const ReactionSchema = new Schema({
	reactionId: {
		type: Schema.Types.ObjectId,
		default: () => new Types.ObjectId(),
	},
	reactionBody: {
		type: String,
		required: true,
		maxlength: 280,
	},
	username: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		get: (timestamp) => new Intl.DateTimeFormat('en-US').format(timestamp),
	},
});

ReactionSchema.set('toObject', { getters: true });
ReactionSchema.set('toJSON', { getters: true });

module.exports = ReactionSchema;
