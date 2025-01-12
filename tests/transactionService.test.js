const redisClient = require("../src/utils/redisClient");
const WalletService = require("../src/services/walletService");
const TransactionService = require("../src/services/transactionService");

describe("TransactionService", () => {
  const walletService = new WalletService();
  const transactionService = new TransactionService();
  const senderId = `sender_${Date.now()}`; // Unique test key
  const receiverId = `receiver_${Date.now()}`;

  beforeAll(async () => {
    await walletService.createWallet(senderId);
    await walletService.createWallet(receiverId);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
    jest.restoreAllMocks(); // Restore original implementations
  });
  
  afterAll(async () => {
    if (process.env.NODE_ENV !== "test") {
      await redisClient.quit(); // Disconnect only if not using mock
    }
  });
  it("should process a valid transaction", async () => {
    const senderWallet = await walletService.getWallet(senderId);
    senderWallet.balance = 500;
    await walletService.updateWallet(senderId, senderWallet);

    const result = await transactionService.processTransaction({
      fromUserId: senderId,
      toUserId: receiverId,
      amount: 100
    });

    expect(result).toBe(true);

    const updatedSender = await walletService.getWallet(senderId);
    const updatedReceiver = await walletService.getWallet(receiverId);
    expect(updatedSender.balance).toBe(400);
    expect(updatedReceiver.balance).toBe(100);
  });

  it("should fail if sender has insufficient balance", async () => {
    const result = await transactionService.processTransaction({
      fromUserId: senderId,
      toUserId: receiverId,
      amount: 1000
    });
    expect(result).toBe(false);
  });
});