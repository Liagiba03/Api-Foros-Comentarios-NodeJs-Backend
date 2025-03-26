const {createUser, getUsers, getUserId, 
    setUpdateUser, deleteUser} = require('../Service/userService');

//CREATE USER
const createUserController= async (req,res)=>{
    const {username, password} = req.body;
    //console.log("USER:"+username);
    const newUser = await createUser(username, password);
    //console.log(newUser);
    if(newUser){
        return res.status(201).json(newUser);
    }else{
        return res.status(500).json({message: 'DB no connected'});
    }
}
//SHOW ALL USERS
const getUsersController = async (req, res)=>{
    const users = await getUsers();
    if(users){
        return res.status(200).json(users);
    }else{
        return res.status(500).json({message: 'DB no connected'});
    }
}
// SHOW USER BY ID
const getUserIdController = async (req, res)=>{
    const {id} = req.params;
    const userId = await getUserId(id);
    if(userId){
        return res.status(200).json(userId);
    }else{
        return res.status(500).json({message: 'DB no connected'});
    }
}
// UPDATE USER
const setUpdateUserController = async (req, res)=>{
    const {id} = req.params;
    const data = req.body;
    const updateUser = await setUpdateUser(id, data);
    if(updateUser){
        return res.status(200).json(updateUser);
    }else{
        return res.status(500).json({message:`DB no connected`});
    }
}
// DELETE USER
const deleteUserController = async (req, res)=>{
    const {name} = req.params;
    const deletedUser = await deleteUser(name);
    if(deletedUser){
        return res.status(200).json(deletedUser);
    }else{
        return res.status(500).json({message:`DB no connected`});
    }
}
module.exports = {createUserController, getUsersController, getUserIdController
    , setUpdateUserController, deleteUserController};

