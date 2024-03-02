import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL: string | undefined = process.env.BASE_URL;

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  status: "success" | "fail";
  message?: string;
}

async function register(
  data: RegisterData
): Promise<RegisterResponse | undefined> {
  try {
    const response = await axios.post(`${BASE_URL}/register`, data);

    if (response.status !== 200 && response.status !== 201) {
      throw new Error(`Registration failed with status: ${response.status}`);
    }

    return response.data as RegisterResponse; // Cast to RegisterResponse type for safety
  } catch (error) {
    // Handle errors gracefully, providing more specific error information if possible
    console.error("Error during registration:", error);
    return {
      status: "fail",
      message:
        error.message || "An unknown error occurred during registration.",
    };
  }
}
