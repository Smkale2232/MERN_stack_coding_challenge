import express from 'express';
import { getPieChartData } from '../controllers/pieChartController.js';

const router = express.Router();

router.get('/', getPieChartData);

export default router;