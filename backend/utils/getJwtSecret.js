import dotenv from "dotenv";

dotenv.config();

// Convert the secret key from a string to a Uint8Array
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export default JWT_SECRET;
