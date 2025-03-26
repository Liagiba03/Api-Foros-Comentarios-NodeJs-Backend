const Foro = require("../model/foroModel");
const {User} = require("../model/userModel");

//crear un foro
const createForo = async (title, description, author, created, update) =>{
    try {
        // El formato es: "yyyy,mm,dd"
        const dateCreate = new Date(created);
        const dateUpdate = new Date(update);
        const newForo = new Foro({
            title:title, description:description, 
            author:author, created_at: dateCreate, last_update: dateUpdate});
        const savedForo = await newForo.save();
        return {status:200, data:savedForo};
    } catch (error) {
        console.log(error);
        return {status:500, data:error};
        
    }
}
//ver todos los foros
const getForos = async () =>{
    try {
        const foros = await Foro.find().populate("author"); ;
        //return foros;
        return (foros === null || Object.keys(foros).length === 0) ? 
             { status: 404, data: "Not foros" } : 
             { status: 200, data: foros };
    } catch (error) {
        console.log(error);
        //return error;
        return {status:500, data: error}
    }
}

//Ver foro por id
const getForoById = async (id) =>{
    try {
        const foro = await Foro.findById(id).populate("author");
        //return foro;
        return (foro === null || Object.keys(foro).length === 0) ? 
             { status: 404, data: `Not found` } : 
             { status: 200, data: foro };
    } catch (error) {
        console.log(error);
        //return error;
        return {status:500, data: error}
    }
}

//Ver foro por titulo
const getForoByTitle = async (title) =>{
    try {
        const foro = await Foro.findOne({title:title}).populate("author"); ;
        //return foro;
        //console.log(foro);
        return (foro === null || Object.keys(foro).length === 0) ? 
             { status: 404, data: `Not deleted` } : 
             { status: 200, data: foro };
        
    } catch (error) {
        console.log(error);
        //return error;
        return {status:500, data: error}
    }
}

//Ver foro por autor:
const getForoByAuthor = async (authorName) =>{
    try {
        // Buscar el usuario por su nombre
        const author = await User.findOne({ name: authorName });
        
        // Si no se encuentra el autor, retornar un mensaje
        if (!author) {
            return { status: 404, data: "Author not found." };
        }

        // Buscar los foros donde el author es el id del usuario encontrado
        const foros = await Foro.find({ "author": author._id }).populate("author");
        
        // Si no se encuentra ningún foro, manejarlo de forma personalizada
        if (!foros || foros.length === 0) {
            return { status: 404, data: "No forums found for this author." };
        }

        return { status: 200, data: foros };
    } catch (error) {
        console.log(error);
        return { status: 500, data: error };
    }
}

//Actualizar foro
const setUpdateForo = async (id, data) =>{
    try {
        const foroUpdated = await Foro.findByIdAndUpdate(id, data, {new: true});
        if(!foroUpdated){
            console.log(`Foro not found id: ${id}`);
            //return null;
            return {status:404, data:"Foro not updated"};
        }
        //return foroUpdated;
        return {status:200, data:foroUpdated};
    } catch (error) {
        console.log(error);
        //return error;
        return {status:500, data: error};
    }
}

//Eliminar foro
const deleteForo = async (id) =>{
    try {
        const foroDeleted = await Foro.deleteOne({_id:id});
        if (foroDeleted.deletedCount === 0) {
            console.log(`Foro with id ${id} not deleted`);
            //return json({message: `Foro with id ${id} not found`});
            return {status:200, data:`Foro with id ${id} not found`};
        }
        //return foroDeleted;
        return {status:200, data:foroDeleted}
        } catch (error) {
        console.log(error);
        //return error;
        return {status:500, data: error}
    }
}

module.exports ={
    createForo,
    getForoById,
    getForos,
    getForoByTitle,
    getForoByAuthor,
    setUpdateForo,
    deleteForo
}