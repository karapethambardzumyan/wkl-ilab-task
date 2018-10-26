const path = require('path');
const crypto = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const users = {
  1: {
    id: 1,
    name: "Karapet Hambardzumyan",
    age: "21",
    birthday: "1997/07/18",
    login: "08 September 2018",
    notification: "07-Sep-18",
    email: "user1@wkl-ilab.com",
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

app.get('/api/authorization', (req, res) => {
  validateToken(req.headers.token, (err, profile) => {
    if(err) {
      return res.status(err.status).send(false);
    }

    return res.send(profile);
  });
});

app.post('/api/authorization', (req, res) => {
  for(let i in users) {
    if(users[i].email === req.body.email && users[i].password === req.body.password) {
      return res.send({ token: encrypt(JSON.stringify(users[i])) });
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

app.get('/api/profile', (req, res) => {
  setTimeout(function() {
    validateToken(req.headers.token, (err, profile) => {
      if(err) {
        return res.status(err.status).send(false);
      }

      return res.send(profile);
    });
  }, 3000);
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

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'app/index.html')));

app.listen(port, () => console.log(`Server has jsut started at ${ port } port!`));
