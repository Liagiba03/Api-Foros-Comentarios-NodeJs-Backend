const {createForo, getForos,getForoById, getForoByTitle, 
    getForoByAuthor, setUpdateForo, deleteForo} = require('../Service/foroService');

//Create forum
const createForoController = async (req, res) => {
    const {title, description, author, created_at, last_update} = req.body;
    const response = await createForo(title, description, author, created_at, last_update);
    return res.status(response.status).json(response.data);
}

// Show-all-forums
const getForosController = async (req, res) => {
    const response = await getForos();
    return res.status(response.status).json(response.data);
}
//show forum by id
const getForoByIdController = async (req, res) => {
    const {id} = req.params;
    const response = await getForoById(id);
    return res.status(response.status).json(response.data);
}
//show forum by title
const getForoByTitleController = async (req, res) => {
    const {title} = req.params;
    const response = await getForoByTitle(title);
    return res.status(response.status).json(response.data);
}

// show forum by author
const getForoByAuthorController = async (req, res) => {
    const {author} = req.params;
    const response = await getForoByAuthor(author);
    return res.status(response.status).json(response.data);
}

// update forum
const setUpdateForoController = async (req, res) => {
    const {id} = req.params;
    const content = req.body;
    const response = await setUpdateForo(id, content);
    return res.status(response.status).json(response.data);
}

// delete forum
const deleteForoController = async (req, res) => {
    const {id} = req.params;
    const response = await deleteForo(id);
    return res.status(response.status).json(response.data);
}

module.exports = {
    createForoController,
    getForosController,
    getForoByIdController,
    getForoByTitleController,
    getForoByAuthorController,
    setUpdateForoController,
    deleteForoController
}