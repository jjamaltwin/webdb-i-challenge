const express = require('express');
const db = require('./data/accounts-model')
const server = express();

// your code here

server.get('/', (req, res) => {
  res.send('Hello World from Express!');
} );


server.get('/api/accounts', async (req, res) => {
        db.find()
    try {
      const account = await db('accounts');
      res.json(account);
    } catch (err) {
      res.status(500).json({ message: 'Failed to get accounts' });
    }
  });

  server.get('/accounts', (req, res) => {
    db.find().then(db => {
        res.status(200).json(db);
    }) .catch(err => {
        res.status(500).json({success: false, err, message: "The acccount information could not be retrieved"});
    });
});

// POST
server.use(express.json());

server.post('/accounts', (req, res) => {
  const newAccount = req.body;

  db.insert(newAccount)
  .then(account => {
      res.status(201).json({success: true, account});
  }) .catch(err => {
      res.status(400).json({success: false, err, message:"Please provide correxct dredentials for account."});
  });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
});

// Delete 

server.delete('/accounts/:id', (req, res) => {
  const {id} = req.params; // Destructure id 
  db.remove(id)
  .then(account => {
      if(account) {
          res.status(204).end();
      } else {
          res.status(404).json({
              success: false,
              message: "I cannot find the account you are looking for "
          })
      }
  }) .catch(err => {
      res.status(500).json({ success: false, err})
  })
});


//UPDATE

server.put('/accounts/:id', (req, res) => {
  const {id} = req.params;
  const changes = req.body

  db.update( id, changes)
  .then(updated => {
      if(updated) {
          res.status(200).json({success: true, updated})
      } else {
          res.status(404).json({
              success: false,
              message: "I cannot find the account you are looking for"
          })
      } 
  })  .catch(err => {
      res.status(500).json({ success: false, err})
  })
});




module.exports = server;