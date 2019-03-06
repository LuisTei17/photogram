const fs = require('fs');

module.exports = (app) => {
    const Post = app.models.postModel,
        controller = {};

    controller.getPost = (req, res) => {
        Post.find({'_id': req.body._id}, (err, posts) => {
            if (err)
                return res.status(500).json(err);
            return res.status(200).json(posts[0]);
        })
    }

    controller.createPost = async (req, res) => {
        if (!req.body || !req.body.userId || !req.files)
            return res.status(500).json({'msg': 'Wrong parameters'});
        
        const date = new Date(),
            filePath = 'src/images/' + date.getTime() + '.jpg',
            file = req.files.file;

        file.mv(`${__dirname}/../../${filePath}`,
            (err) => {
                if (err)
                    return res.status(500).json(err);
                let post = new Post({
                    title: req.body.title,
                    photoPath: filePath,
                    user: req.body.userId
                })
        
                post.save();
        
                return res.status(200).json(post);
            }
        )
    }

    controller.editPost = (req, res) => {
        Post.find({'_id': req.body._id}, (err, post) => {

            if(err)
                return res.status(500).json(err);
            post.title = req.body.title;
            post.save();

            return res.status(200).json(post);
        })
    }

    controller.deletePost = (req, res) => {
        Post.deleteOne({'_id': req.body._id}, (err, post) => {
            if (err)
                return res.status(500).json(err);
            return res.status(200).json(post);
        })
    }

    controller.getPosts = (req, res) => {
        Post.find({}, (err, posts) => {
            if (err)
                return res.status(500).json(err);
            posts = posts.map(post => {
                let fileBuffer = fs.readFileSync(post.photoPath);
                post.photoPath = Buffer.from(fileBuffer).toString('base64');
                return post;
            })
            return res.status(200).json(posts);
        })
    }

    return controller;

} 