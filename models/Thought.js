const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const ThoughtSchema = new Schema({
	thoughtText: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 280,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		get: (timestamp) => new Intl.DateTimeFormat('en-US').format(timestamp),
	},
	username: {
		type: String,
		required: true,
	},
	reactions: [Reaction],
});

ThoughtSchema.virtual('reactionCount').get(function () {
	return this.reactions.length;
});

ThoughtSchema.set('toObject', { getters: true });
ThoughtSchema.set('toJSON', { getters: true });

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
