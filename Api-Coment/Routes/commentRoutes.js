const {createCommentController, getCommentsForoByIdController, 
    getCommentsAuthorByIdController, setUpdateCommentController, 
    deleteCommentController} = require('../Controller/commentController');
const router = require('express').Router();

router.post('/create', createCommentController);
router.get('/commentsforo/:foro_id', getCommentsForoByIdController);
router.get('/commentsauthor/:user_id', getCommentsAuthorByIdController);
router.patch('/update/:id', setUpdateCommentController);
router.delete('/delete/:id', deleteCommentController);

module.exports = router;

