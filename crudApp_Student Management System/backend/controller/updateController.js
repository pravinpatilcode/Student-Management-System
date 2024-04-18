const User = require('../model/userSchema');

async function UpdateUser(req, res) {
    try {
        const userId = req.params.id;
        const updatedUserData = req.body;
        console.log(userId)
        console.log(updatedUserData,"<=== updatedUserData")

        const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = UpdateUser;
