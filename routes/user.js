const { response } = require('express');
const express = require('express');
const router = express.Router();
const userAccessor = require('./models/User.Model');
const jwt = require('jsonwebtoken');
const auth_middleware = require('./auth_middleware.js')

// Returns all known users
router.get('/findAll', function(request, response) {
    userAccessor.getAllUsers()
        .then((userResponse) => {
            response.status(200).send(userResponse)
        })  
        .catch(error => response.status(400).send(error))
})

// check who is currently logged in 
router.get('/whoIsLoggedIn', auth_middleware, function(request, response) {
    const username = request.session.username;

    console.log(request.session);
    return response.send(username);
})

router.get('/whoIsLoggedInButWithoutMiddleware', function(request, response) {
    const username = request.session.username;

    return response.send(username);
})

// find a specific user name 
router.get('/:username', (request, response) => {
  const username = request.params.username;
  if(!username) {
    return response.status(422).send("Missing data");
  }
  
  return userAccessor.findUserByUsername(username)
    .then((userResponse) => {
        if(!userResponse) {
            response.status(404).send("User not found");
        }

        response.send(userResponse);
    })
    .catch(() => response.status(500).send("Issue getting user"))
})


router.post('/login', function(request, response) {
    const { username, password } = request.body;

    if (!username && !password) {
        return response.status(422).send('Both password and username are missing');
    } else if (!username) {
        return response.status(422).send('Username is missing');
    } else if (!password) {
        return response.status(422).send('Password is missing');
    }

    return userAccessor.findUserByUsername(username)
        .then((userResponse) => {
            if (!userResponse) {
                return response.status(404).send("No user found with that username");
            }

            // password match
            if (userResponse.password === password) {
                request.session.username = username;
                return response.status(200).send({username});
            } else {
                return response.status(404).send("No user found with that password");
            }
        })
        .catch((error) => console.error(`Something went wrong: ${error}`));

})


router.post('/signup', function(request, response) {
    const { username, password } = request.body;

    if (!username && !password) {
        return response.status(422).send('Both password and username are missing');
    } else if (!username) {
        return response.status(422).send('Username is missing');
    } else if (!password) {
        return response.status(422).send('Password is missing');
    }
    var exists = userAccessor.findUserByUsername(username);
    console.log(exists);

    return userAccessor.insertUser({username: username, password: password})
        .then((userResponse) => {
            request.session.username = username;
            return response.status(200).send({username});
        })
        .catch(error => response.status(422).send(error))
    })

router.post('/logout', function(request, response) {
    request.session.destroy()
    return response.send("Ok");
})

module.exports = router;