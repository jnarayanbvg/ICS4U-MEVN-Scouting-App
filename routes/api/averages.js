const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Averages -- Mostly for testing purposes
router.get('/', async (req, res) => {
    const averages = await loadAveragesCollection();
    res.send(await averages.find({}).toArray());
    res.status(200).send();
});

// Get Averages By Comp
router.get('/:comp', async (req, res) => {
    const averages = await loadAveragesCollection();
    res.send(await averages.find({competition: req.params.comp }).toArray());
    res.status(200).send();
});

//Get Averages By Comp and Team
router.get('/:comp/team/:team', async (req, res) => {
    const averages = await loadAveragesCollection();
    let int = parseInt(req.params.team);
    if(Number.isNaN(int)) res.status(400).send(); //Invalid team number
    else {
        res.send(await averages.find({competition: req.params.comp, teamNumber: parseInt(req.params.team)}).toArray());
        res.status(200).send();
    }
});

// Upsert Average
router.post('/', async (req, res) => {
    const averages = await loadAveragesCollection();
    await averages.findOneAndUpdate(
        { competition: req.body.competition, teamNumber: req.body.teamNumber },
        { $set: { 
            competition: req.body.competition,
            teamNumber: req.body.teamNumber,
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
            matchCount: req.body.matchCount,
            defenseCount: req.body.defenseCount
        } },
        { upsert: true }
    );
    res.status(201).send();
});

// Delete Averages By Comp -- Scouting apps don't typically necessitate deleting a single average
router.delete('/:comp', async (req, res) => {
    const averages = await loadAveragesCollection();
    let result = await averages.deleteMany({ competition: req.params.comp });
    if(result.deletedCount>0) res.status(200).send();
    else res.status(204).send(); //No content found
});

// Helper method to access the database
async function loadAveragesCollection() {
    const pass = require('../../config/keys.js').mongoPass;
    const client = await mongodb.MongoClient.connect(`mongodb+srv://jnarayan:${pass}@scoutingapp-9cfq1.mongodb.net/test?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    return client.db('ScoutingApp').collection('averages');
}

module.exports = router;