module.exports = function(app) {
    const controller = {},
        User = app.models.userModel;

    const findUser = async (user) => {
        return User.find({'name': user.name}, (err, user) => {
            if(err)
                return;
            return user;
        })
    };

    controller.createUser = (req, res) => {
        const newUser = new User(req.body);

        newUser.save((err) => {
            if (err)
                return res.status(500).json(err);        
            return res.status(200).json(newUser);
        })
        

    }

    controller.login = (req, res) => {
        if(!req.body || !req.body.name || !req.body.password)
            return res.status(500).json({'msg': 'Wrong parameters'});
        
        User.find({
            'name': req.body.name, 
            'password': req.body.password},
            (err, users) => {
                if (err)
                    return res.status(404).json(err);
                if (!users.length)
                    return res.status(404).json({'msg': 'User not found'})
                return res.status(200).json(users[0]);
            }
        );
    }

    controller.alterPassword = async (req, res) => {
       const usersFound = await findUser(req.body);
        if(!usersFound.length)
            return res.status(404).json({'msg': 'User not found'});
        
        const user = usersFound[0];

        user.password = req.body.password;
        
        user.save();
        return res.status(200).json(user);
    }

    controller.validateUser = async (req, res) => {
        const usersFound = await findUser(req.body);
        if (!usersFound.length)
            return res.status(404).json({'msg': 'Invalid credential'});
        return res.status(200).json({'msg': 'User validated'});
    }

    return controller;

}