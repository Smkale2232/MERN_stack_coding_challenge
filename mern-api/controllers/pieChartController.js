import Transaction from '../models/transaction.js';

export const getPieChartData = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ message: "Month is required" });
    }

    const monthNumber = new Date(`${month} 1, 2021`).getMonth() + 1; // Get month number

    const startDate = new Date(`2021-${monthNumber}-01`);
    const endDate = new Date(`2021-${monthNumber + 1}-01`);

    const pieChartData = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: { $gte: startDate, $lt: endDate },
          sold: true,
          category: { $exists: true } // Ensure category exists
        }
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    const formattedChartData = pieChartData.map(item => ({
      category: item._id,
      count: item.count
    }));

    res.json({ pieChartData: formattedChartData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};