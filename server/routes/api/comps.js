const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Comps
router.get('/', async (req, res) => {
    const comps = await loadCompsCollection();
    res.send(await comps.find({}).toArray());
});

// Add Comp
router.post('/', async (req, res) => {
    const comps = await loadCompsCollection();
    await comps.insertOne({
        name: req.body.name,
        createdAt: new Date()
    });
    res.status(201).send();
});

// Delete Comp
router.delete('/:id', async (req, res) => {
    const comps = await loadCompsCollection();
    await comps.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});


async function loadCompsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://jnarayan:mongodbpass@scoutingapp-9cfq1.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    return client.db('ScoutingApp').collection('comps');
}


module.exports = router;