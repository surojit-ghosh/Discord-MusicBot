import { Router } from "express";
import apiRoute from './api/index.js';

const router = Router();

export default (client) => {
    router.use('/api', apiRoute(client));
    return router;
};