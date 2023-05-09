const Thought = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
	// Get all thoughts
	getAllThoughts: async (req, res) => {
		try {
			const thoughts = await Thought.find();
			res.json(thoughts);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// Get a single thought by ID
	getThoughtById: async (req, res) => {
		try {
			const thought = await Thought.findById(req.params.id);
			res.json(thought);
		} catch (error) {
			res.status(404).json(error);
		}
	},

	// Create a new thought
	createThought: async (req, res) => {
		try {
			const thought = await Thought.create(req.body);
			await User.findOneAndUpdate({ username: req.body.username }, { $push: { thoughts: thought._id } }, { new: true });
			res.json(thought);
		} catch (error) {
			res.status(400).json(error);
		}
	},

	// Update a thought by ID
	updateThought: async (req, res) => {
		try {
			const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
				runValidators: true,
			});
			res.json(thought);
		} catch (error) {
			res.status(400).json(error);
		}
	},

	// Delete a thought by ID
	deleteThought: async (req, res) => {
		try {
			const thought = await Thought.findByIdAndDelete(req.params.id);
			res.json(thought);
		} catch (error) {
			res.status(404).json(error);
		}
	},

	// Add a reaction to a thought
	createReaction: async (req, res) => {
		try {
			const thought = await Thought.findByIdAndUpdate(
				req.params.thoughtId,
				{ $push: { reactions: req.body } },
				{ new: true, runValidators: true }
			);
			res.json(thought);
		} catch (error) {
			res.status(400).json(error);
		}
	},

	// Remove a reaction from a thought
	deleteReaction: async (req, res) => {
		try {
			const thought = await Thought.findByIdAndUpdate(
				req.params.thoughtId,
				{ $pull: { reactions: { _id: req.params.reactionId } } },
				{ new: true }
			);
			res.json(thought);
		} catch (error) {
			res.status(404).json(error);
		}
	},
};

module.exports = thoughtController;
