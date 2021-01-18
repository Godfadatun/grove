import Auth from '../controllers/auth';
import checkAuth from '../middlewares/check-auth'

module.exports = app => {
    app.post('/auth/login', Auth.login);
    app.post('/auth/signup', Auth.signup);
    app.post('/auth/forgot', Auth.forgotPassword)
    app.post('/auth/verify', Auth.verifyToken)
    app.post('/auth/reset', checkAuth, Auth.resetPassword)
};
