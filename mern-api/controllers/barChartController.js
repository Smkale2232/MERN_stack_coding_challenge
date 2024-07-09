import Transaction from '../models/transaction.js';

export const getBarChartData = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ message: "Month is required" });
    }

    const monthNumber = new Date(`${month} 1, 2021`).getMonth() + 1; // Get month number

    const startDate = new Date(`2021-${monthNumber}-01`);
    const endDate = new Date(`2021-${monthNumber + 1}-01`);

    const barChartData = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: { $gte: startDate, $lt: endDate },
          sold: true,
          price: { $exists: true }  // Ensure price exists
        }
      },
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                { case: { $and: [{ $gte: ["$price", 0] }, { $lte: ["$price", 100] }] }, then: "0-100" },
                { case: { $and: [{ $gte: ["$price", 101] }, { $lte: ["$price", 200] }] }, then: "101-200" },
                { case: { $and: [{ $gte: ["$price", 201] }, { $lte: ["$price", 300] }] }, then: "201-300" },
                { case: { $and: [{ $gte: ["$price", 301] }, { $lte: ["$price", 400] }] }, then: "301-400" },
                { case: { $and: [{ $gte: ["$price", 401] }, { $lte: ["$price", 500] }] }, then: "401-500" },
                { case: { $and: [{ $gte: ["$price", 501] }, { $lte: ["$price", 600] }] }, then: "501-600" },
                { case: { $and: [{ $gte: ["$price", 601] }, { $lte: ["$price", 700] }] }, then: "601-700" },
                { case: { $and: [{ $gte: ["$price", 701] }, { $lte: ["$price", 800] }] }, then: "701-800" },
                { case: { $and: [{ $gte: ["$price", 801] }, { $lte: ["$price", 900] }] }, then: "801-900" },
                { case: { $gte: ["$price", 901] }, then: "901-above" }
              ]
            }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({ barChartData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};