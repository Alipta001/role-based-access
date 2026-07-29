const express=require('express');
const AuthController = require('../../controller/AuthController');
const AdminAuthCheck = require('../../middleware/AdminAuthCheck');

const router=express.Router();

router.post('/auth/login', AuthController.adminlogin);
router.post('/auth/refresh-token', AuthController.adminRefreshToken);
router.get('/auth/logout', AdminAuthCheck('admin'), AuthController.logout);
router.post('/add-user', AdminAuthCheck('admin'), AuthController.addUser);


module.exports = router;

