const logger = require("../utils/logger");
const { ALERT_HIGH_VALUE_THRESHOLD, ALERT_SUSPICIOUS_ACTIVITY_THRESHOLD } = require("../config/constants");

class AlertService {
  /**
   * Check if a transaction is high-value and log an alert.
   * @param {number} amount
   */
  checkHighValueTransaction(amount) {
    if (amount >= ALERT_HIGH_VALUE_THRESHOLD) {
      logger.warn(`High-value transaction detected: $${amount}`);
      // Additional alert mechanism (e.g., email, SMS) could go here
      return true;
    }
    return false;
  }

  /**
   * Check for suspicious activity, e.g. repeated small transactions in a short time.
   *For simplicity,  let's assume if there's a certain number of transactions in a row, it's suspicious.
   * @param {Array} transactions
   */
  checkSuspiciousActivity(transactions) {
    if (transactions.length >= ALERT_SUSPICIOUS_ACTIVITY_THRESHOLD) {
      logger.warn(`Suspicious activity detected with ${transactions.length} recent transactions`);
      //additional alert mechanism could be triggered
      return true;
    }
    return false;
  }
}

module.exports = AlertService;
