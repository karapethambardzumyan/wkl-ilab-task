const path = require('path');
const crypto = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const users = {
  1: {
    id: 1,
    role: 'Admin',
    name: "Karapet Hambardzumyan",
    age: "21",
    birthday: "1997/07/18",
    login: "08 September 2018",
    notification: "07-Sep-18",
    email: "admin@wkl-ilab.com",
    password: "qwerty"
  },
  2: {
    id: 2,
    role: 'Ordinary',
    name: "Karapet Hambardzumyan",
    age: "21",
    birthday: "1997/07/18",
    login: "08 September 2018",
    notification: "07-Sep-18",
    email: "user1@wkl-ilab.com",
    password: "qwerty"
  },
  3: {
    id: 3,
    role: 'Ordinary',
    name: "Karapet Hambardzumyan",
    age: "21",
    birthday: "1997/07/18",
    login: "08 September 2018",
    notification: "07-Sep-18",
    email: "user2@wkl-ilab.com",
    password: "qwerty"
  }
};

const algorithm = 'aes-256-ctr';
const password = 'only_server_know_it';

function encrypt(text) {
  if(text) {
    let cipher = crypto.createCipher(algorithm, password);
    let crypted = cipher.update(text, 'utf8', 'hex');
        crypted += cipher.final('hex');

    return crypted;
  }
}

function decrypt(text) {
  if(text) {
    let decipher = crypto.createDecipher(algorithm, password);
    let dec = decipher.update(text,'hex', 'utf8');
        dec += decipher.final('utf8');

    return dec;
  }
}

function validateToken(token, cb) {
  const profile = decrypt(token);

  for(let i in users) {
    if(JSON.stringify(users[i]) === profile) {
      return cb(null, users[i]);
    }
  }

  return cb({
    msg: 'Incorrect token!',
    status: 400
  });
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/libs', express.static(path.join(__dirname, 'node_modules')));
app.use('/localization', express.static(path.join(__dirname, 'app/localization')));
app.use('/app', express.static(path.join(__dirname, 'app')));
app.use('/components', express.static(path.join(__dirname, 'app/components')));
app.use('/css', express.static(path.join(__dirname, 'app/assets/css')));
app.use('/img', express.static(path.join(__dirname, 'app/assets/img')));

// CRUD for authroziation
app.get('/api/authorization', (req, res) => {
  validateToken(req.headers.token, (err, profile) => {
    if(err) {
      return res.status(err.status).send(false);
    }

    return res.send({ role: profile.role });
  });
});

app.post('/api/authorization', (req, res) => {
  for(let i in users) {
    if(users[i].email === req.body.email && users[i].password === req.body.password) {
      return res.send({
        token: encrypt(JSON.stringify(users[i])),
        role: users[i].role
      });
    }
  }

  return res.status(403).send(false);
});

app.delete('/api/authorization', (req, res) => {
  validateToken(req.headers.token, err => {
    if(err) {
      return res.status(err.status).send(false);
    }

    return res.send(true);
  });
});

// CRUD for profile
app.get('/api/profile', (req, res) => {
  setTimeout(function() {
    validateToken(req.headers.token, (err, profile) => {
      if(err) {
        return res.status(err.status).send(false);
      }

      return res.send(profile);
    });
  }, 300);
});

app.put('/api/profile', (req, res) => {
  validateToken(req.headers.token, (err, profile) => {
    if(err) {
      return res.status(err.status).send(false);
    }

    for(let i in req.body) {
      if(i in users[profile.id]) {
        users[profile.id][i] = req.body[i];
      }
    }

    return res.send({ token: encrypt(JSON.stringify(users[profile.id])) });
  });
});

// CRUD for users
app.get('/api/users/:id?', (req, res) => {
  validateToken(req.headers.token, (err, profile) => {
    if(err) {
      return res.status(err.status).send(false);
    }

    if(req.params.id === undefined) {
      const newUsers = {};

      for(let i in users) {
        if(users[i].id !== profile.id) {
          newUsers[i] = users[i];
        }
      }

      return res.send(newUsers);
    }

    if(!(req.params.id in users)) {
      return res.status(400).send(false);
    }

    return res.send(users[req.params.id]);
  });
});

app.post('/api/users', (req, res) => {
  validateToken(req.headers.token, (err, profile) => {
    if(err) {
      return res.status(err.status).send(false);
    }

    if(profile.role !== 'Admin' || profile.id === Number(req.params.id)) {
      return res.status(403).send(false);
    }

    const ids = Object.keys(users).map(val => Number(val));
    const id = Math.max.apply(Math, ids) + 1;

    users[id] = {
      id: id,
      role: 'Ordinary',
      name: "Default User",
      age: "21",
      birthday: "1997/07/18",
      login: "08 September 2018",
      notification: "07-Sep-18",
      email: req.body.email,
      password: req.body.password
    };

    return res.send(true);
  });
});

app.put('/api/users/:id', (req, res) => {
  validateToken(req.headers.token, (err, profile) => {
    if(err) {
      return res.status(err.status).send(false);
    }

    if(profile.role !== 'Admin' || profile.id === Number(req.params.id)) {
      return res.status(403).send(false);
    }

    for(let i in req.body) {
      if(i in users[req.params.id]) {
        users[req.params.id][i] = req.body[i];
      }
    }

    return res.send(true);
  });
});

app.delete('/api/users/:id', (req, res) => {
  validateToken(req.headers.token, (err, profile) => {
    if(err) {
      return res.status(err.status).send(false);
    }

    if(profile.role !== 'Admin' || profile.id === Number(req.params.id)) {
      return res.status(403).send(false);
    }

    delete users[req.params.id];

    return res.send(true);
  });
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'app/index.html')));

app.listen(port, () => console.log(`Server has jsut started at ${ port } port!`));
