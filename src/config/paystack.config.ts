import { registerAs } from "@nestjs/config";

export default registerAs('paystack', () => ({
    secretKey: process.env.PAYSTACK_SECRET_KEY,
    transactionInitUrl: process.env.PAYSTACK_TRANSACTION_INIT_URL,
    transactionVerifyBaseUrl: process.env.PAYSTACK_TRANSACTION_VERIFY_BASE_URL
}));