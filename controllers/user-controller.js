const User = require('../models/User');
const Thought = require('../models/Thought');

const userController = {
	// Get all users
	getAllUsers: async (req, res) => {
		try {
			const users = await User.find();
			res.json(users);
		} catch (error) {
			res.status(500).json(error);
			console.log(error);
		}
	},

	// Get a single user by ID
	getUserById: async (req, res) => {
		try {
			const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
			res.json(user);
		} catch (error) {
			res.status(404).json(error);
		}
	},

	// Create a new user
	createUser: async (req, res) => {
		try {
			console.log(req.body);
			const user = await User.create(req.body);
			res.json(user);
		} catch (error) {
			res.status(400).json(error);
		}
	},

	// Update a user by ID
	updateUser: async (req, res) => {
		try {
			const user = await User.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
				runValidators: true,
			});
			res.json(user);
		} catch (error) {
			res.status(400).json(error);
		}
	},

	// Delete a user by ID
	deleteUser: async (req, res) => {
		try {
			const user = await User.findById(req.params.id);

			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}
			await Thought.deleteMany({ username: user.username });
			const deletedUser = await User.findByIdAndDelete(req.params.id);

			res.json(deletedUser);
		} catch (error) {
			res.status(404).json(error);
		}
	},

	// Add a friend to a user's friend list
	addFriend: async (req, res) => {
		try {
			const user = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
			res.json(user);
		} catch (error) {
			res.status(400).json(error);
		}
	},

	// Remove a friend from a user's friend list
	removeFriend: async (req, res) => {
		try {
			const user = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
			res.json(user);
		} catch (error) {
			res.status(404).json(error);
		}
	},
};

module.exports = userController;
