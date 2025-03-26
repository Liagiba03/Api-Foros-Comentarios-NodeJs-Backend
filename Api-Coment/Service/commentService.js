const Comment = require('../models/comentModel');
require('dotenv').config();
const urlForo = process.env.URL_FORO_SERVICE;

// Crear comentario en un foro
const createComment = async (foro_id, user_id, comment, created_at) => {
    try {
        const dateNew = new Date(created_at);
        const newComment = new Comment({ foro_id: foro_id, user_id: user_id, comment: comment, created_at: dateNew })
        const savedComment = await newComment.save();
        return (savedComment === null || Object.keys(savedComment).length === 0) ? 
             { status: 404, data: ({msj:`Not created`}) } : 
             { status: 200, data: savedComment };
    } catch (error) {
        console.log(error);
        return {status:500, data:error};
    }
}

//Obtener comentarios de un foro por id
/*const getCommentsForoById = async (foro_id) => {
    try {
        const comments = await Comment.find({ foro_id: foro_id }).select('comment user_id created_at');

        //Bloque para buscar el nombre del usuario init
        const response = await fetch(`${urlForo}/show-user/${comments.user_id}`);
        //Bloque para buscar el nombre del usuario end

        return (comments === null || Object.keys(comments).length === 0) ? 
             { status: 404, data: ({msj:`Not comments on forum`}) } : 
             { status: 200, data: comments };
    } catch (error) {
        console.log(error);
        return {status:500, data:error};
    }
}*/
const getCommentsForoById = async (foro_id) => {
    try {
        const comments = await Comment.find({ foro_id: foro_id }).select('comment user_id created_at');
        
        if (comments === null || comments.length === 0) {
            return { status: 404, data: { msj: 'Not comments on forum' } };
        }

        // Obtener el nombre del usuario para cada comentario
        const commentsWithUserNames = await Promise.all(comments.map(async (comment) => {
            const response = await fetch(`${urlForo}/usr/show-user/${comment.user_id}`);
            const userData = await response.json();
            console.log(`${urlForo}/usr/show-user/${comment.user_id}`);
            return {
                _id: comment._id,
                comment: comment.comment,
                user_name: userData.name,
                created_at: comment.created_at
            };
        }));

        return { status: 200, data: commentsWithUserNames };
    } catch (error) {
        console.log(error);
        return { status: 500, data: error };
    }
}

//Obtener comentarios de un usuario por Id
/*const getCommentsAuthorById = async (user_id) => {
    try {
        const comments = await Comment.find({ user_id: user_id });
        return (comments === null || Object.keys(comments).length === 0) ? 
             { status: 404, data: ({msj:`Not comments for this author`}) } : 
             { status: 200, data: comments };
    } catch (error) {
        console.log(error);
        return {status:500, data:error};
    }
}*/
const getCommentsAuthorById = async (user_id) => {
    try {
        const comments = await Comment.find({ user_id: user_id }).select('comment foro_id created_at');
        //console.log(comments);
        if (comments === null || comments.length === 0) {
            return { status: 404, data: { msj: 'Not comments for this author' } };
        }

        // Obtener el nombre del foro para cada comentario
        const commentsWithForoNames = await Promise.all(comments.map(async (comment) => {
            //console.log(`${urlForo}/show-foro-id/${comment.foro_id}`);
            const response = await fetch(`${urlForo}/show-foro-id/${comment.foro_id}`);
            const foroData = await response.json();
            //console.log(foroData);
            return {
                _id: comment._id,
                comment: comment.comment,
                title_foro: foroData.title,
                created_at: comment.created_at
            };
        }));

        return { status: 200, data: commentsWithForoNames };
    } catch (error) {
        console.log(error);
        return { status: 500, data: error };
    }
}


//Editar un comentario
const setUpdateComment = async (id_comment, data) => {
    try {
        const commentUpdated = await Comment.findByIdAndUpdate(id_comment, data, {new: true});
        return (commentUpdated === null || Object.keys(commentUpdated).length === 0) ? 
             { status: 404, data: ({msj:`Not update`}) } : 
             { status: 200, data: commentUpdated };
    } catch (error) {
        console.log(error);
        return {status:500, data:error};
    }
}

//Eliminar un comentario
const deleteComment  = async (id_comment) => {
    try {
        const commentDeleted = await Comment.deleteOne({_id:id_comment});
        return (commentDeleted === null || Object.keys(commentDeleted).length === 0) ? 
             { status: 404, data: ({msj:`Not deleted`}) } : 
             { status: 200, data: commentDeleted };
    } catch (error) {
        console.log(error);
        return {status:500, data:error};
        
    }
}

module.exports ={
    createComment,
    getCommentsForoById,
    getCommentsAuthorById,
    setUpdateComment,
    deleteComment
}