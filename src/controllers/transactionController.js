const TransactionService = require("../services/transactionService");
const transactionService = new TransactionService();

class TransactionController {
  static async processTransaction(req, res) {
    const { fromUserId, toUserId, amount } = req.body;
    if (!fromUserId || !toUserId || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    try {
      const success = await transactionService.processTransaction({ fromUserId, toUserId, amount });
      if (!success) {
        return res.status(400).json({ error: "Transaction failed or invalid" });
      }
      return res.status(200).json({ message: "Transaction successful" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = TransactionController;
