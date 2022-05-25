import express from "express";
import { responsibleRoutes } from "./responsible-routes";
import { userRoutes } from "./user-routes";

export const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/responsibles', responsibleRoutes);