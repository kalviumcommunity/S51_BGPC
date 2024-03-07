const express = require('express');
const router = express.Router();
const Joi = require('joi')
const Profile = require('../models/comp.model');

router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next(); 
});

const postCompSchema = Joi.object({
  PC: Joi.string().required(),
  CPU: Joi.string().required(),
  GPU: Joi.string().required(),
  RAM: Joi.string().required(),
  Storage: Joi.string().required(),
  SMPS: Joi.string().required(),
  Cabinet: Joi.string().required(),
  Price_INR: Joi.string().required()
});

router.get("/getcomp", async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getcomp/:pc", async (req, res) => {
  try {
    const { pc } = req.params;
    const profile = await Profile.findOne({ PC: pc });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/postComp", async (req, res) => {
  try {
    const { error } = postCompSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const { PC, CPU, GPU, RAM, Storage, SMPS, Cabinet, Price_INR } = req.body;
    const comp = new Profile({ PC, CPU, GPU, RAM, Storage, SMPS, Cabinet, Price_INR });
    await comp.save();
    res.status(201).json({ message: "Success", added_Profile: { comp } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

router.patch("/putComp/:PC", async (req, res) => {
  try {
    const { PC } = req.params;

    const updates = req.body;

    const profile = await Profile.findOneAndUpdate(
      { PC },
      { $set: updates },
      { new: true }
    );

    if (!profile) {
      return res.status(404).send({ message: "Profile not found" });
    }

    res.status(200).send({ message: "Successfully updated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Error");
  }
});

router.delete("/delete/:PC", async (req, res) => {
  try {
    const { PC } = req.params;
    const profile = await Profile.findOneAndDelete({ PC });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).send({ message: "Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
