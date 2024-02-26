const express = require('express')
const router = express.Router()
const Profile = require('../models/comp.model')
const { get } = require("http")
const { profile } = require('console')


router.get("/getcomp", async (req, res) => {
    try{
        const profile = await Profile.find();
        res.status(200).json(profile)
    }catch (err){
        console.error(err.message)
        res.status(500).send("Internal Server Error")
    }
})

router.post("/postComp" , async (req, res) => {
    try{
        const { PC, CPU, GPU, RAM, Storage, SMPS, Cabinet, Price_INR} = req.body
        if (!PC || !CPU || !GPU || !RAM || !Storage || !SMPS || !Cabinet || !Price_INR ){
            return res.status(400).send({message: "Please provide all fields."})
        }
        const comp = new Profile ({ PC, CPU, GPU, RAM, Storage, SMPS, Cabinet, Price_INR})
        await comp.save()
        res.status(201).json({message:"Success", added_Profile: {comp}})
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Internal Server Error")
    }
})

router.patch("/putComp/:PC", async (req, res) => {
    try{
        const { PC } = req.params
        const updates = req.body

        const profile = await Profile.findOneAndUpdate(
            { PC },
            { $set: updates},
            { new: true}
        )
        
        if (!profile){
            return res.status(404).send({ message: "Profile not found"})
        }

        res.status(200).send({message: "Successfully added"})
    }catch(err){
        console.error(err.message);
        res.status(500).send("Internal Error")
    }
})

router.delete("/delete/:PC", async (req, res) => {
    try{
        const { PC } = req.params;
        const profile = await Profile.findOneAndDelete({ PC })
        
        if (!profile) {
            return res.status(404).json({message: "Profile not found"})
        }
        res.status(200).send({message: "delete"})
    }catch(err){
        console.error(err.message)
        res.status(500).send("Server error")
    }
})


module.exports = router