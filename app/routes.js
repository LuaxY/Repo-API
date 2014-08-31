module.exports = function(app, passport, auth) {

    app.use(function(req, res, next) {
        console.log(req.method + " " + req.originalUrl);
        next();
    });

    app.get('/api', function(req, res) {
        res.json({ 
            users_url: '/api/users/{user}',
            repos_url: '/api/users/{user}/repos/{repo}',
            modules_urls: '/api/modules/{module}',

        });
    });

    // --- USERS ---

    var users = require('./controllers/users')(passport);

    app.get('/api/users', users.all);
    app.post('/api/users', users.add);
    app.get('/api/users/:username', users.get);
    app.put('/api/users/:username', auth.ensureAuthenticated, users.update);
    app.delete('/api/users/:username', users.delete);

    // --- USERS REPOS ---

    var users_repos = require('./controllers/users.repos')(passport);

    app.get('/api/users/:username/repos', users_repos.all);
    app.get('/api/users/:username/repos.json', users_repos.all); // Dofus Market place need file format .json
    app.post('api/users/:username/repos', users_repos.add);
    app.get('/api/users/:username/repos/:repo', users_repos.get);
    app.put('/api/users/:username/repos/:repo', users_repos.update);
    app.delete('/api/users/:username/repos/:repo', users_repos.delete);
    app.get('/api/users/:username/repos/search/:repo', users_repos.search);

    // --- MODULES ---

    var modules = require('./controllers/modules')(passport);

    app.get('/api/modules', modules.all);
    app.post('/api/modules', modules.add);
    app.get('/api/modules/:name', modules.get);
    app.put('/api/modules/:name', modules.update);
    app.delete('/api/modules/:name', modules.delete);
};
