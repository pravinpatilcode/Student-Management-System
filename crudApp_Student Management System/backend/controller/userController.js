const User = require('../model/userSchema');


async function getUsers(req, res) {
    try {
        const users = await User.find({});
        console.log(users)
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports=getUsers;
