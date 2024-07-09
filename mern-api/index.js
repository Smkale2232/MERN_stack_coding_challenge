import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import transactionRoutes from './routes/transactions.js';
import statsRoutes from './routes/stats.js';
import barChartRoutes from './routes/barChart.js';
import combinedDataRoutes from './routes/combinedData.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/transactions', transactionRoutes);
app.use('/stats', statsRoutes);
app.use('/bar-chart', barChartRoutes);
app.use('/combined-data', combinedDataRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});