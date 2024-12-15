import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { getUserByEmail, createUser } from "../db/users";

const SALT_ROUNDS = 10;

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email).select('+authentication.password');

        if (!user) {
            return res.sendStatus(400);
        }

        const isValid = await bcrypt.compare(password, user.authentication.password);
        if (!isValid) {
            return res.sendStatus(403);
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

        res.cookie("ts-rest-api", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000,
            path: "/",
        });

        return res.status(200).json(user).end();

    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ message: "Missing required fields" }); 
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const user = await createUser({
            email,
            username,
            authentication: {
                password: hashedPassword,
            },
        });

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
