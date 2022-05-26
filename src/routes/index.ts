import express from "express";
import { authRoutes } from "./auth-routes";
import { categoryRoutes } from "./category-routes";
import { responsibleRoutes } from "./responsible-routes";
import { userRoutes } from "./user-routes";

export const routes = express.Router();

routes.use('/auth', authRoutes);
routes.use('/users', userRoutes);
routes.use('/responsibles', responsibleRoutes);
routes.use('/categories', categoryRoutes);