const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Comps
router.get('/', async (req, res) => {
    const comps = await loadCompsCollection();
    res.send(await comps.find({}).toArray());
    res.status(200).send();
});

//Get One Comp
router.get('/:id', async (req, res) => {
    const comps = await loadCompsCollection();
    res.send(await comps.findOne({_id: new mongodb.ObjectID(req.params.id)}));
    res.status(200).send();
});

// Add Comp
router.post('/', async (req, res) => {
    const comps = await loadCompsCollection();
    await comps.insertOne({
        name: req.body.name
    });
    res.status(201).send();
});

// Update Comp
router.post('/:id', async (req, res) => {
    const comps = await loadCompsCollection();
    await comps.findOneAndUpdate(
        { _id: new mongodb.ObjectID(req.params.id) },
        { $set: { name: req.body.name } }
    );
    res.status(201).send();
});

// Delete Comp
router.delete('/:id', async (req, res) => {
    const comps = await loadCompsCollection();
    let result = await comps.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    if(result.deletedCount>0) res.status(200).send();
    else res.status(204).send(); //No content found
});


async function loadCompsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://jnarayan:mongodbpass@scoutingapp-9cfq1.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    return client.db('ScoutingApp').collection('comps');
}


module.exports = router;