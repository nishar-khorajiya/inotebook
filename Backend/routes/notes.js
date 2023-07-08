const express = require('express')
const Note = require('../models/Note')
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const router = express.Router()

//Rout 1: Get all the notes
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {

        const notes = await Note.find({ user: req.user.id })
        res.send(notes)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('some internal server error ')
    }
})

//Rout 2:add notes
router.post('/addnote', fetchuser, [
    body('title', 'enter valid title').isLength({ min: 3 }),
    body('description', 'enter valid description').isLength({ min: 5 })

], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const notes = new Note({
            title, description, tag, user: req.user.id
        })

        const savedNote = await notes.save()
        res.json(savedNote)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('some internal server error ')
    }
})


//Rout 3:update note
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body

    const newNote = {}
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }

    //find a not to be updated and update it
    let note = await Note.findById(req.params.id)

    if (!note) { return res.status(404).send("Not found") }
    if (note.user.toString() !== req.user.id) { return res.status(401).send("Not allowed") }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new : true })
    res.json(note)
})
module.exports = router