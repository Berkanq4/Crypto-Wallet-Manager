const redisClient = require("../src/utils/redisClient");
const WalletService = require("../src/services/walletService");

describe("WalletService", () => {
  const walletService = new WalletService();
  const testUserId = "testUser123";

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
    jest.restoreAllMocks(); // Restore original implementations
  });
  
  afterAll(async () => {
    if (process.env.NODE_ENV !== "test") {
      await redisClient.quit(); // Disconnect only if not using mock
    }
  });

  it("should create a new wallet", async () => {
    const wallet = await walletService.createWallet(testUserId);
    expect(wallet).toHaveProperty("userId", testUserId);
    expect(wallet).toHaveProperty("balance", 0);
    expect(wallet).toHaveProperty("publicKey");
    expect(wallet).toHaveProperty("privateKey");
    expect(wallet.transactions).toEqual([]);
  });

  it("should retrieve an existing wallet", async () => {
    const existingWallet = await walletService.getWallet(testUserId);
    expect(existingWallet).not.toBeNull();
    expect(existingWallet.userId).toBe(testUserId);
  });
});
