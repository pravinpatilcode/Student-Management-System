
const User = require('../model/postuserSchema');

async function postUser(req, res) {

    console.log(req.body)
    try {
        const { first_name, last_name, email } = req.body; 


        const newUser = new User({
            first_name, last_name,
            email
        });

     
        const savedUser = await newUser.save();

        res.status(201).json(savedUser); 
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports=postUser;