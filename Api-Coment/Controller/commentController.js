const {createComment, getCommentsForoById, getCommentsAuthorById,
     setUpdateComment, deleteComment} = require('../Service/commentService')

// Crear comentario en un foro
const createCommentController = async (req, res) => {
    const {foro_id, user_id, comment, created_at} = req.body;
    const response = await createComment(foro_id, user_id, comment, created_at);
    return res.status(response.status).json(response.data);
}

//Obtener comentarios de un foro por id
const getCommentsForoByIdController = async (req, res) =>{
    const {foro_id} = req.params;
    const response = await getCommentsForoById(foro_id);
    return res.status(response.status).json(response.data);
}

//Obtener comentarios de un usuario por Id
const getCommentsAuthorByIdController = async (req, res) => {
    const {user_id} = req.params;
    const response = await getCommentsAuthorById(user_id);
    return res.status(response.status).json(response.data);
}

//Editar un comentario
const setUpdateCommentController = async (req, res) => {
    const {id} = req.params;
    const content = req.body;
    const response = await setUpdateComment(id, content);
    return res.status(response.status).json(response.data);
}

//Eliminar un comentario
const deleteCommentController = async (req, res) => {
    const {id} = req.params;
    const response = await deleteComment(id);
    return res.status(response.status).json(response.data);
}

module.exports ={
    createCommentController,
    getCommentsForoByIdController,
    getCommentsAuthorByIdController,
    setUpdateCommentController,
    deleteCommentController
}

