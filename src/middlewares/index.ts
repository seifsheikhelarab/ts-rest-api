import dotenv from "dotenv";
dotenv.config();
import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { get, identity, merge } from "lodash";
import { Request } from "express";
import { getUserBySessionToken } from "../db/users";

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = req.identity?._id.toString();

        if (!currentUserId) return res.sendStatus(400);
        if (currentUserId !== id) return res.sendStatus(403);

        next();
    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
};


export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const token = req.cookies['ts-rest-api'];

        if (!token) {
            console.log("No token provided");
            return res.sendStatus(404);
        }

        console.log("Token received:", token);

        // Verify JWT
        jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: JwtPayload) => {
            if (err) {
                console.error("JWT Verification error:", err);
                return res.sendStatus(402);
            }

            console.log("Decoded JWT:", decoded); 

            req.identity = decoded;
        });
        
    } catch (error) {
        console.error("Error:", error);
        return res.sendStatus(400);
}};
