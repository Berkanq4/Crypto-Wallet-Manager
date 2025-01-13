# Crypto Wallet Management & Transaction Monitoring

A Node.js backend system for managing crypto wallets and monitoring transactions in real-time, using **Redis** for caching/persistence. This project is designed with Object-Oriented principles, includes robust logging and error handling, and provides comprehensive test coverage with **Jest**.

## Features

1. **Wallet Management**
   - Create & store wallets for multiple users
   - Generates mock public/private key pairs
   - Balance tracking & transaction history

2. **Transaction Monitoring**
   - Validates transactions via a simulated blockchain API
   - Logs transaction history for each wallet

3. **Alerts**
   - Generates alerts for high-value transactions
   - Detects suspicious activity based on transaction volume

## Technology Stack

- **Node.js** (ES6+)
- **Redis** (ioredis for client)
- **Express** (for RESTful endpoints)
- **Winston** (for logging)
- **Jest** (for testing)

----------------------------------------------------

## Project Structure

1. Setup
Clone the repository:

   git clone https://github.com/Berkanq4/crypto_wallet_management_backend.git
   cd crypto_wallet


2. Start Redis
Make sure Redis is running:
   redis-server

To verify Redis is working:
   redis-cli ping

Expected response:
   PONG


3. Install dependencies:
   npm install
   npm install --save-dev jest
   npm install axios
   npm install ioredis@^5
   npm install --save-dev ioredis-mock
  
 
4. Start the Application
Start the server:
   npm start

The server will start on http://localhost:3000.
----------------------------------------------------------
API Endpoints

1. Create Wallet
POST /wallet
Request Body:

   {
   "userId": "user123"
   }
   
Response:

   {
   "userId": "user123",
   "publicKey": "PUB-randomkey",
   "privateKey": "PRIV-randomkey",
   "balance": 0,
   "transactions": []
   }


2. Get Wallet Details
GET /wallet/:userId
Example: /wallet/user123
Response:

   {
   "userId": "user123",
   "publicKey": "PUB-randomkey",
   "privateKey": "PRIV-randomkey",
   "balance": 0,
   "transactions": []
   }

3. Update the userId balance if necessary:
   redis-cli
   set wallet:user123 '{"userId":"user123","publicKey":"PUB-somekey","privateKey":"PRIV-somekey","balance":100,"transactions":[]}'

4. Process Transaction
POST /transaction
Request Body:

   {
   "fromUserId": "user123",
   "toUserId": "user456",
   "amount": 50
   }

Response:
On Success:

   {
   "message": "Transaction successful"
   }
On Failure:

   {
   "error": "Transaction failed or invalid"
   }

5. Testing the Code
Run Unit Tests
The project includes tests to verify wallet creation, transaction validation, and alert triggers.

Run all tests:


   npm test

Generate a code coverage report:


   npx jest --coverage


6. Logs and Alerts
Logs: Transaction activities and alerts for high-value or suspicious transactions are logged in the terminal.
Example log for a high-value transaction:

   WARN: High-value transaction detected: $10000
   Example log for suspicious activity:
   
   WARN: Suspicious activity detected with 5 recent transactions

# crypto_wallet_management_backend
# crypto_wallet_management_backend
# Crypto-Wallet-Manager
