const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
  db("accounts")
    .then(accounts => {
      if (accounts) {
        res.status(200).json({ accounts });
      } else {
        res.status(404).json({ message: "Accounts Not Found" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: `There was an error:${err}` });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db("accounts")
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

router.post("/", (req, res) => {
  db("accounts")
    .insert(req.body, "id")
    .then(ids => {
      if (ids > 0) {
        db("accounts")
          .where({ id: ids[0] }) //grabs the first id number that is returned in the ids array
          .first() //this grabs the first element
          .then(account => {
            res.status(200).json({ data: account });
          });
      } else {
        res.status(404).json({ message: "Account Not Added" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "sorry, ran into an error" });
    });

  // db("accounts")
  //   .insert(req.body, "id")
  //   .then(ids => {
  //     res.status(201).json({ results: ids });
  //   })
  //   .catch(error => {
  //     res.status(500).json({ message: "sorry, ran into an error" });
  //   });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  db("accounts")
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        db("accounts")
          .where({ id: req.params.id })
          .first() //this grabs the first element
          .then(account => {
            res.status(200).json({ data: account });
          });
      } else {
        res.status(404).json({ message: "Account Not Found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "sorry, ran into an error" });
    });
});

router.delete("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "record deleted successfully" });
      } else {
        res.status(400).json({ message: "Account Not Found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: " sorry ran into an error" });
    });
});

module.exports = router;
