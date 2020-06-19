const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Matches -- Mostly for testing purposes
router.get('/', async (req, res) => {
    const matches = await loadMatchesCollection();
    res.send(await matches.find({}).toArray());
    res.status(200).send();
});

// Get Matches By Comp -- Mostly for testing purposes
router.get('/:comp', async (req, res) => {
    const matches = await loadMatchesCollection();
    res.send(await matches.find({competition: req.params.comp}).toArray());
    res.status(200).send();
});

//Get Matches By Comp and Team
router.get('/:comp/team/:team', async (req, res) => {
    const matches = await loadMatchesCollection();
    let int = parseInt(req.params.team);
    if(Number.isNaN(int)) res.status(400).send(); //Invalid team number
    else {
        res.send(await matches.find({competition: req.params.comp, teamNumber: parseInt(req.params.team)}).toArray());
        res.status(200).send();
    }
});

//Get Matches By Comp and Match
router.get('/:comp/match/:match', async (req, res) => {
    const matches = await loadMatchesCollection();
    let int = parseInt(req.params.match);
    if(Number.isNaN(int)) res.status(400).send(); //Invalid team number
    else {
        res.send(await matches.find({competition: req.params.comp, matchNumber: parseInt(req.params.match)}).toArray());
        res.status(200).send();
    }
});

// Add Match
router.post('/', async (req, res) => {
    const matches = await loadMatchesCollection();
    await matches.insertOne({
        competition: req.body.competition,
        matchNumber: req.body.matchNumber,
        teamNumber: req.body.teamNumber,
        allianceColor: req.body.allianceColor,
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

// Delete Matches By Comp -- Scouting apps don't typically necessitate deleting a single match
router.delete('/:comp', async (req, res) => {
    const matches = await loadMatchesCollection();
    let result = await matches.deleteMany({ competition: req.params.comp });
    if(result.deletedCount>0) res.status(200).send();
    else res.status(204).send(); //No content found
});

// Helper method to access the database
async function loadMatchesCollection() {
    console.log(process.env.PORT);
    console.log(process.env.TEST);
    const pass = require('../../config/keys.js').mongoPass;
    const client = await mongodb.MongoClient.connect(`mongodb+srv://jnarayan:${pass}@scoutingapp-9cfq1.mongodb.net/test?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    return client.db('ScoutingApp').collection('matches');
}

module.exports = router;