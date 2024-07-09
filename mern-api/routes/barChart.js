import express from 'express';
import { getBarChartData } from '../controllers/barChartController.js';

const router = express.Router();

router.get('/', getBarChartData);

export default router;