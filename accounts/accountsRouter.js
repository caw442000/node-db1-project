const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();


router.get('/', (req, res) => {
  db('accounts')
  .then(accounts => {
    if(accounts) {
      res.status(200).json({accounts})
    } else {
      res.status(404).json({ message: "Accounts Not Found" });
    }
  })
  .catch( err => {
    res.status(500).json({error: `There was an error:${err}`})
  })
 
  
  
})

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db('accounts')
    .where({ id: req.params.id }) //returns a promise
    .first() //this grabs the first element
    .then(account => {
      if (account) {
        res.status(200).json({ data: account });
      } else {
        res.status(404).json({ message: "Account Not Found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "sorry, ran into an error" });
    });
});

module.exports = router;