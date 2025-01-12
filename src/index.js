const express = require("express");
const WalletController = require("./controllers/walletController");
const TransactionController = require("./controllers/transactionController");
const logger = require("./utils/logger");

const app = express();
app.use(express.json());

// Routes
app.post("/wallet", WalletController.createWallet);
app.get("/wallet/:userId", WalletController.getWallet);
app.post("/transaction", TransactionController.processTransaction);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
