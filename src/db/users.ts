import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    authentication: {
        password: { type: String, required: true, select: false },
        sessionToken: { type: String, select: false },
    },
});

export const userModel = mongoose.model("user", userSchema);

export const getUsers = () => userModel.find();

export const getUserByEmail = (email: string) => 
    userModel.findOne({ email }).select('+authentication.password');

export const getUserBySessionToken = (sessionToken: string) => 
    userModel.findOne({ "authentication.sessionToken": sessionToken });

export const getUserById = (id: string) => userModel.findById(id);

export const createUser = (values: Record<string, any>) => 
    new userModel(values).save().then((user) => user.toObject());

export const deleteUserById = (id: string) => userModel.findOneAndDelete({ _id: id });

export const updateUserById = (id: string, values: Record<string, any>) => 
    userModel.findByIdAndUpdate(id, values, { new: true });
