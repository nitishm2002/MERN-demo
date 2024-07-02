const User = require('../models/user');

async function addUser(req, res) {
    try {
        let newUser = await User.create({
            name: req.body.name,
            gender: req.body.gender,
        });

        res.status(200).json({
            status: 'success',
            message: 'User Added Successfully',
            data: newUser
        })
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
}

async function getUser(req, res) {
    try {
        // let {role}
        let users = await User.findAll({});

        res.status(200).json({
            status: 'success',
            message: 'User data fetch Successfully',
            data: users
        })
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetching user' });
    }
}

async function deleteUser(req, res) {
    try {
        await User.destroy({ where: { id: req.params.userId } });
        res.status(200).json({
            status: 'success',
            message: 'User deleted Successfully',
        })
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to deleting user' });
    }
}
module.exports = {
    addUser,
    getUser,
    deleteUser,
}