const Case = require('../models/case');

const CASE_LIMIT = 100;
const mongoose = require('mongoose');

module.exports = (app) => {
  app.get('/cases', (req, res) => {
    Case
      .find({})
      .populate('victim')
      .populate('lastModifiedBy', 'name')
      .populate('suspects')
      .limit(CASE_LIMIT)
      .exec((err, cases) => {
        if (err) {
          return res.json(500, err);
        }
        return res.status(200).send(cases);
      });
  });

  // Creates a Case
  app.post('/cases', (req, res) => {
    // Check if case with that DR # does not already exist
    Case.count({ drNumber: req.body.drNumber }, (err, result) => {
      if (err) {
        return res.status(400).json(err);
      }
      if (result > 0) {
        return res.status(404).json({ text: 'DR Number already exists', value: req.body.drNumber });
      }

      const victimIDInput = req.body.victim;
      const userIDInput = req.body.lastModifiedBy;

      // Checks if victimID is valid
      if (victimIDInput.match(/^[0-9a-fA-F]{24}$/)) {
        // If valid, converts it into the ObjectID type from string
        const victimID = mongoose.Types.ObjectId(victimIDInput);
        // and reassigns it as the value of 'victim'
        req.body.victim = victimID;
      } else {
        return res.status(404).json({ text: 'Victim ID is invalid', value: victimIDInput });
      }

      // Checks if UserID is valid COPIED CODE
      if (userIDInput.match(/^[0-9a-fA-F]{24}$/)) {
        // If valid, converts it into the ObjectID type from string
        const userID = mongoose.Types.ObjectId(userIDInput);
        // and reassigns it as the value of 'victim'
        req.body.lastModifiedBy = userID;
      } else {
        return res.status(404).json({ text: 'User ID is invalid', value: userIDInput });
      }

      // Checks if suspectsIDs in array are valid SORTA COPIED CODE-- cleanup
      const suspectInput = req.body.suspects;
      const suspectIDs = [];

      for (let i = 0; i < suspectInput.length; i += 1) {
        if (suspectInput[i].match(/^[0-9a-fA-F]{24}$/)) {
          // If valid, converts it into the ObjectID type from string
          suspectIDs.push(mongoose.Types.ObjectId(suspectInput[i]));
        } else {
          return res.status(404).json({ text: 'Suspect ID is invalid', value: suspectInput[i] });
        }
      }
      req.body.suspects = suspectIDs;

      Case.create(req.body, (err, coupon) => {
        if (err) {
          return res.status(400).json(err);
        }
        return res.status(201).send(coupon);
      });
    });
  });

  // Searches by drNum.
  app.get('/cases/:id', (req, res) => {
    const id = req.params.id;
    Case.findOne({ drNumber: id })
      .populate('victim')
      .populate('lastModifiedBy', 'name')
      .populate('suspects')
      .exec((err, result) => {
        if (err) {
          return res.status(400).send(err);
        }
        if (!result) {
          return res.status(404).json({ text: 'DR Num does not exist', value: id });
        }
        return res.json(result);
      });
  });

  app.put('/cases/:id', (req, res) => {
    const id = req.params.id;
    Case.update({ _id: id }, req.body, (err, numUpdated) => {
      if (err) {
        return res.status(400).json(err);
      }
      return res.status(200).json({ text: 'Number updated', value: numUpdated });
    });
  });

  app.delete('/cases/:id', (req, res) => {
    const id = req.params.id;
    Case.remove({ _id: id }, (err) => {
      if (err) {
        return res.status(400).json(err);
      }
      return res.status(200).json({ 'Deleted Case': id });
    });
  });
};
