import Contact from '../controllers/contact';
import checkAuth from '../middlewares/check-auth'

/**
 *
 *
 */
module.exports = app => {
    app.post('/contact', checkAuth, Contact.create)
    app.get('/contact', checkAuth, Contact.get)
    app.get('/contact/:id', checkAuth, Contact.findOne)
    app.put('/contact/:id', checkAuth, Contact.update)
    app.delete('/contact/:id', checkAuth, Contact.remove)
    // app.route('/contact/all').get(Contact.all);
    /**
     * Create the remaining routes
     * get,
     * create,
     * delete,
     * update,
     * remove
     */
};
