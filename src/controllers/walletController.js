const WalletService = require("../services/walletService");
const walletService = new WalletService();

class WalletController {
  static async createWallet(req, res) {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }
    try {
      const walletData = await walletService.createWallet(userId);
      return res.status(201).json(walletData);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getWallet(req, res) {
    const { userId } = req.params;
    try {
      const walletData = await walletService.getWallet(userId);
      if (!walletData) {
        return res.status(404).json({ error: "Wallet not found" });
      }
      return res.status(200).json(walletData);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = WalletController;
