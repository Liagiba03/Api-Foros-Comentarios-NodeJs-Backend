const {createForoController,getForoByIdController, 
    getForosController, getForoByTitleController, 
    getForoByAuthorController, setUpdateForoController, 
    deleteForoController} = require('../controller/foroController');

const router = require('express').Router();

router.post('/create-foro', createForoController);
router.get('/show-foros', getForosController);
router.get('/show-foro-id/:id', getForoByIdController);
router.get('/show-title/:title', getForoByTitleController);
router.get('/show-author/:author', getForoByAuthorController);
router.patch('/update/:id', setUpdateForoController);
router.delete('/delete/:id', deleteForoController);

module.exports = router;

