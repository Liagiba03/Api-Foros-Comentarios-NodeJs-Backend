const { createUserController, getUsersController, 
    getUserIdController, setUpdateUserController, 
    deleteUserController } = require('../controller/userController');

const router = require('express').Router();

router.post('/create-user', createUserController);
router.get('/show-all-users',getUsersController);
router.get('/show-user/:id',getUserIdController);
router.patch('/update-user/:id', setUpdateUserController);
router.delete('/delete-user/:name',deleteUserController);

module.exports = router;

