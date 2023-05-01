
const { User, Thought } = require('../models');



module.exports = {
    // Get all users
    async getUsers(req, res) {
      try {
        const users = await User.find();  
        res.json(users);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },

    // Get a single user
    async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId })
          .select('-__v')
          .populate('friends')
          .populate('thoughts');

  
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' })
        }

      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },

    // create a new user
    async createUser(req, res) {
      try {
        const user = await User.create(req.body);
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    // update user info
    async updateUser(req, res) {
      try{
        const user = await User.findOneAndUpdate(
          {
            _id: req.params.userId
          },
          {
            $set: req.body
          },
          {
            runValidators: true,
            new: true
          }
          );

        if (!user){
          return res.status(404).json({message: "No user with this id :("});
        }

        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    // Delete a user and remove their thoughts
    async deleteUser(req, res) {
      try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
  
        if (!user) {
          return res.status(404).json({ message: 'no user matches this id :(' });
        }
  
        const thought = await Thought.deleteMany({_id: {$in: user.thoughts}});
  
        if (!thought) {
          return res.status(404).json({
            message: 'User deleted, no thoughts found',
          });
        }
  
        res.json({ message: 'User successfully deleted' });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    async addFriend(req, res) {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId }, 
          { $addToSet: { friends: req.params.friendId } }, 
          { new: true } );

        if (!user) {
          return res.status(404).json({ message: 'no user matches this id :(' });
        }

        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    async removeFriend(req, res) {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId},
          { $pull: { friends: req.params.friendId} },
          { runValidators: true, new: true});

        if (!user) {
          return res.status(404).json({ message: 'no user matches this id :(' });
        }

        res.json(user);
      }catch (err) {
        res.status(500).json(err);
      }
    },
};
  