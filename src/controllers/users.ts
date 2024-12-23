import express from "express";
import mongoose from "mongoose";

import { deleteUserById, getUserById, getUsers, updateUserById } from "../db/users";

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: "Failed to retrieve users" });
    }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    return res.json({ message: 'User deleted', data: deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateUser = async (req: express.Request, res: express.Response) => {
    try{
        const { id } = req.params;
        const { username } = req.body;

        if(!username) res.sendStatus(400);

        const user = await getUserById(id);

        user.username = username;
        await user.save();

        return res.status(200).json({ message: 'User updated', data: user }).end();
        

    }catch(error){
        console.error(error);
        return res.sendStatus(400);
    }
}