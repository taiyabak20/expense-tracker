const User = require('../models/User');
exports.showLeaderBoard = async (req, res) => {
    try {
        const users = await User.find({})
            .select('id name totalSum') 
            .sort({ totalSum: -1 }); 

        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
