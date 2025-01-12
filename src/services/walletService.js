const redisClient = require("../utils/redisClient");
const logger = require("../utils/logger");
const { REDIS_WALLET_PREFIX } = require("../config/constants");

class WalletService {
  constructor() {
    // This could be replaced with more advanced  keypair generation for real usage
    this.generateKeyPair = () => {
      return {
        publicKey: `PUB-${Math.random().toString(36).substring(2)}`,
        privateKey: `PRIV-${Math.random().toString(36).substring(2)}`
      };
    };
  }

  /**
   *Creates a new wallet for a given userId.
   * @param {string} userId
   * @returns {Promise<Object>} wallet data
   */
  async createWallet(userId) {
    try {
      const { publicKey, privateKey } = this.generateKeyPair();

      const walletData = {
        userId,
        publicKey,
        privateKey,
        balance: 0,
        transactions: []
      };

      await redisClient.set(`${REDIS_WALLET_PREFIX}${userId}`, JSON.stringify(walletData));
      logger.info(`Wallet created for userId: ${userId}`);

      return walletData;
    } catch (error) {
      logger.error(`Error creating wallet for userId ${userId}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Retrieves an existing wallet by userId .
   * @param {string} userId
   * @returns {Promise<Object|null>} wallet data or null if not found
   */
  async getWallet(userId) {
    try {
      const walletString = await redisClient.get(`${REDIS_WALLET_PREFIX}${userId}`);
      return walletString ? JSON.parse(walletString) : null;
    } catch (error) {
      logger.error(`Error retrieving wallet for userId ${userId}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Updates an existing wallet in Redis
   * @param {string} userId 
   * @param {Object} updatedData
   */
  async updateWallet(userId, updatedData) {
    try {
      await redisClient.set(`${REDIS_WALLET_PREFIX}${userId}`, JSON.stringify(updatedData));
      logger.info(`Wallet updated for userId: ${userId}`);
    } catch (error) {
      logger.error(`Error updating wallet for userId ${userId}: ${error.message}`);
      throw error;
    }
  }
}

module.exports = WalletService;
