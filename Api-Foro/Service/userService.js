const { User } = require("../model/userModel")

// CREATE USERS
const createUser = async (username, password)=>{
    try {
        //.log("USER:"+username);
        const newUser = new User({name:username, password:password});
        const savedUser = await newUser.save();
        //console.log("SAVED:"+savedUser);
        return savedUser;
    } catch (error) {
        console.log(error);
        return null;
        
    }
}
// SHOW ALL USERS
const getUsers = async ()=>{
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        console.log(error);
        return null;
    }
}
//SHOW USER BY ID
const getUserId = async(id)=>{
    try {
        const userFind = await User.findById(id);
        return userFind;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// UPDATE USER
const setUpdateUser = async (id, data) => {
    try {
        const userUpdated = await User.findByIdAndUpdate(id, data, { new: true });
        if (!userUpdated) {
            console.log(`User with ID ${id} not found`);
            return null;
        }
        return userUpdated;
    } catch (error) {
        console.log(`Error updating user with ID ${id}:`, error);
        return null;
    }
}
//DELETE USER
const deleteUser = async (name) => {
    try {
        const userDeleted = await User.deleteOne({ name: name });
        if (userDeleted.deletedCount === 0) {
            console.log(`User with username ${name} not found`);
            return null;
        }
        return userDeleted;
    } catch (error) {
        console.log(`Error deleting user with username ${name}:`, error);
        return null;
    }
}
module.exports = {createUser, getUsers, getUserId, setUpdateUser, deleteUser}
