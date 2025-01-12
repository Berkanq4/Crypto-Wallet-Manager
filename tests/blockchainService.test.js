const BlockchainService = require("../src/services/blockchainService");
const axios = require("axios");

jest.mock("axios"); // Mock axios library

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {}); // Suppress console.error
});

afterEach(() => {
  jest.clearAllMocks(); // Clear mocks after each test
  jest.restoreAllMocks(); // Restore original console.error
});

describe("BlockchainService", () => {
  let blockchainService;

  beforeEach(() => {
    blockchainService = new BlockchainService();
  });

  test("should fetch wallet balance successfully", async () => {
    axios.get.mockResolvedValueOnce({ data: { balance: 100000 } });

    const walletBalance = await blockchainService.getWalletBalance("test-wallet");
    expect(walletBalance).toBe(100000);
  });

  test("should return true for valid transaction", async () => {
    axios.get.mockResolvedValueOnce({ data: { balance: 2000 } });

    const transaction = {
      fromUserId: "sender-wallet",
      toUserId: "receiver-wallet",
      amount: 1000,
    };

    const isValid = await blockchainService.validateTransaction(transaction);
    expect(isValid).toBe(true);
  });

  test("should return false for insufficient balance", async () => {
    axios.get.mockResolvedValueOnce({ data: { balance: 500 } });

    const transaction = {
      fromUserId: "sender-wallet",
      toUserId: "receiver-wallet",
      amount: 1000,
    };

    const isValid = await blockchainService.validateTransaction(transaction);
    expect(isValid).toBe(false);
  });

  test("should handle API failure gracefully", async () => {
    axios.get.mockRejectedValueOnce(new Error("Blockchain API error"));

    const transaction = {
      fromUserId: "sender-wallet",
      toUserId: "receiver-wallet",
      amount: 1000,
    };

    const isValid = await blockchainService.validateTransaction(transaction);
    expect(isValid).toBe(false); // Expect the transaction to fail
  });
});