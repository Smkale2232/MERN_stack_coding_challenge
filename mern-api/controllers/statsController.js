import Transaction from '../models/transaction.js';

export const getStatistics = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ message: "Month is required" });
    }

    const monthNumber = new Date(`${month} 1, 2021`).getMonth() + 1; // Get month number

    const startDate = new Date(`2021-${monthNumber}-01`);
    const endDate = new Date(`2021-${monthNumber + 1}-01`);

    const totalSalesAmount = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lt: endDate }, sold: true } },
      { $group: { _id: null, total: { $sum: "$price" } } }
    ]);

    const totalSoldItems = await Transaction.countDocuments({
      dateOfSale: { $gte: startDate, $lt: endDate },
      sold: true
    });

    const totalNotSoldItems = await Transaction.countDocuments({
      dateOfSale: { $gte: startDate, $lt: endDate },
      sold: false
    });

    res.json({
      totalSalesAmount: totalSalesAmount[0]?.total || 0,
      totalSoldItems,
      totalNotSoldItems
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};