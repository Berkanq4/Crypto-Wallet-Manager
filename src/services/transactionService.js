const logger = require("../utils/logger");
const BlockchainService = require("./blockchainService");
const AlertService = require("./alertService");
const WalletService = require("./walletService");

class TransactionService {
  constructor() {
    this.blockchainService = new BlockchainService();
    this.alertService = new AlertService();
    this.walletService = new WalletService();
  }

  /**
   * Processes a transaction from one user to another.
   * @param {Object} transaction - { fromUserId, toUserId, amount }
   * @returns {Promise<boolean>} - true if successful
   */
  async processTransaction(transaction) {
    try {
      const { fromUserId, toUserId, amount } = transaction;

      // Validate transaction
      const isValid = this.blockchainService.validateTransaction(transaction);
      if (!isValid) {
        logger.error("Invalid transaction detected by blockchain service");
        return false;
      }

      // Retrieve wallets
      const fromWallet = await this.walletService.getWallet(fromUserId);
      const toWallet = await this.walletService.getWallet(toUserId);

      if (!fromWallet || !toWallet) {
        logger.error("One or both wallets do not exist");
        return false;
      }

      // Check if sender has enough balance
      if (fromWallet.balance < amount) {
        logger.error(`User ${fromUserId} has insufficient balance`);
        return false;
      }

      // Deduct & add balance
      fromWallet.balance -= amount;
      toWallet.balance += amount;

      // Update transaction history
      const timestamp = new Date().toISOString();
      const txRecord = {
        fromUserId,
        toUserId,
        amount,
        timestamp
      };

      fromWallet.transactions.push(txRecord);
      toWallet.transactions.push(txRecord);

      // Persist updates to Redis
      await this.walletService.updateWallet(fromUserId, fromWallet);
      await this.walletService.updateWallet(toUserId, toWallet);

      // Check alerts
      this.alertService.checkHighValueTransaction(amount);
      this.alertService.checkSuspiciousActivity(fromWallet.transactions);

      logger.info(
        `Transaction successful! ${fromUserId} sent ${amount} to ${toUserId}.`
      );
      return true;
    } catch (error) {
      logger.error(`Error processing transaction: ${error.message}`);
      throw error;
    }
  }
}

module.exports = TransactionService;
