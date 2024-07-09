import Transaction from '../models/transaction.js';

export const getTransactions = async (req, res) => {
  try {
    const { page = 1, perPage = 10, search = '', month = '' } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { price: parseFloat(search) }
      ];
    }

    if (month) {
      const monthNumber = new Date(`${month} 1, 2021`).getMonth(); // Get month number
      query.dateOfSale = { $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber + 1] } };
    }

    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));

    const total = await Transaction.countDocuments(query);

    res.json({ transactions, total, page, perPage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};