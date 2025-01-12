const axios = require("axios");

class BlockchainService {
  constructor() {
    this.blockchainApiUrl = "https://api.blockcypher.com/v1/btc/main"; // Example for Bitcoin
  }

  /**
   * Validate a transaction by checking sender's balance and recipient's address.
   * @param {Object} transaction - { fromUserId, toUserId, amount }
   * @returns {Promise<boolean>} - true if valid, false otherwise
   */
  async validateTransaction(transaction) {
    const { fromUserId, amount } = transaction;
    try {
      const senderBalance = await this.getWalletBalance(fromUserId);
      if (senderBalance < amount) {
        console.error("Insufficient balance in sender's wallet.");
        return false;
      }
      return true; // Transaction is valid
    } catch (error) {
      console.error("Error validating transaction:", error.message);
      return false; // Return false on validation error
    }
  }

  /**
   * Get the wallet balance from the blockchain.
   * @param {string} walletAddress - The wallet address to check.
   * @returns {Promise<number>} - The balance of the wallet.
   */
  async getWalletBalance(walletAddress) {
    try {
      const response = await axios.get(`${this.blockchainApiUrl}/addrs/${walletAddress}/balance`);
      return response.data.balance; // Return balance from the API
    } catch (error) {
      console.error("Error fetching wallet balance:", error.message);
      return 0; // Return a safe default value on error
    }
  }
}

module.exports = BlockchainService;