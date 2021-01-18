/**
 * A simple CRUD controller for contacts
 * Create the necessary controller methods
 */
import Contact from "../entities/contact";


export const get = async (req, res) => {
    const contacts = await Contact.find({user: req.user.id}).exec()
    res.status(200).json({
        status: true,
        message: 'successfully retrieved contacts',
        data: contacts
    })
}

export const create = async (req, res) => {
    const body = req.body
    const docs = new Contact({
        name: body.name,
        phone_number: body.phone_number,
        email: body.email,
        address: body.address,
        gender: body.gender,
        user: req.user.id
    })
    try {
        const contact = await docs.save()
        res.status(200).json({
            status: true,
            message: 'successful',
            data: contact
        })
    } catch (e) {
        res.status(400).json({
            status: false,
            message: 'contact exist',
        })
    }

}


export const findOne = async (req, res) => {
    const contacts = await Contact.findOne({user: req.user.id, _id: req.params.id}).exec()
    if (contacts) {
        res.status(200).json({
            status: true,
            message: 'successfully retrieved contacts',
            data: contacts
        })
    } else {
        res.status(404).json({
            status: false,
            message: 'invalid id'
        })
    }
}

export const update = async (req, res) => {
    const body = req.body
    const contact = await Contact.findOneAndUpdate({_id: req.params.id, user: req.user.id}, {
        name: body.name,
        phone_number: body.phone_number,
        email: body.email,
        address: body.address,
        gender: body.gender
    }).exec()
    if (contact) {
        res.status(200).json({
            status: true,
            message: 'update successful'
        })
    } else {
        res.status(400).json({
            status: false,
            message: 'update failed'
        })
    }
}

export const remove = async (req, res) => {
    const contact = await Contact.findOneAndDelete({_id: req.params.id, user: req.user.id})
    if (contact) {
        res.status(200).json({
            status: true,
            message: 'deleted successfully'
        })
    } else {
        res.status(400).json({
            status: false,
            message: 'delete failed'
        })
    }
}
export default {
    get,
    create,
    findOne,
    update,
    remove
    // get all contacts for a user
    // all,
    // // get a single contact
    // get,
    // // create a single contact
    // create,
    // // update a single contact
    // update,
    // // remove a single contact
    // remove
}

