const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Matches
router.get('/', async (req, res) => {
    const matches = await loadMatchesCollection();
    res.send(await matches.find({}).toArray());
});

// Get Matches By Comp
router.get('/:comp', async (req, res) => {
    const matches = await loadMatchesCollection();
    res.send(await matches.find({competition: req.params.comp}).toArray());
});

// Add Match
router.post('/', async (req, res) => {
    const matches = await loadMatchesCollection();
    await matches.insertOne({
        competition: req.body.competition,
        matchNumber: req.body.matchNumber,
        teamNumber: req.body.teamNumber,
        allianceColor: req.body.allianceColor,
        habStart: req.body.habStart,
        habLeave: req.body.habLeave,
        habClimb: req.body.habClimb,
        sandstormCargo: req.body.sandstormCargo,
        sandstormPanel: req.body.sandstormPanel,
        shipCargo: req.body.shipCargo,
        shipPanel: req.body.shipPanel,
        lowCargo: req.body.lowCargo,
        lowPanel: req.body.lowPanel,
        midCargo: req.body.midCargo,
        midPanel: req.body.midPanel,
        highCargo: req.body.highCargo,
        highPanel: req.body.highPanel,
        cargoFloor: req.body.cargoFloor,
        cargoHuman: req.body.cargoHuman,
        panelFloor: req.body.panelFloor,
        panelHuman: req.body.panelHuman,
        timeDefending: req.body.timeDefending,
        defenseStrength: req.body.defenseStrength,
        comments: req.body.comments,
        scoutName: req.body.scoutName
    });
    res.status(201).send();
});

// Delete Match
router.delete('/:id', async (req, res) => {
    const matches = await loadMatchesCollection();
    await matches.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});


async function loadMatchesCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://jnarayan:mongodbpass@scoutingapp-9cfq1.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    return client.db('ScoutingApp').collection('matches');
}


module.exports = router;