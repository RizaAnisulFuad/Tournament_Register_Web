import axiosInstance from "@/services/api";
import axios from "axios";
import { toast } from "sonner";

export interface LoginPayload {
  username: string;
  password: string;
}
export interface LoginResponse {
  message: string;
  data: Data;
}

interface Data {
  token: string;
}

export interface UserData {
  id: number;
  name: string;
  username: string;
  created_at: Date;
  updated_at: Date;
}

export interface UsersResponse {
  message: string;
  data: DataUsers[];
}

export interface DataUsers {
  id: number;
  name: string;
  username: string;
  created_at: Date;
  updated_at: Date;
  number: number;
}

export interface RegisterPayload {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const login = async ({
  username,
  password,
}: LoginPayload): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>(
      "/api/auth/login",
      {
        username,
        password,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
      throw error;
    }

    throw new Error("An unexpected error occurred");
  }
};

export const registerUser = async ({
  name,
  username,
  email,
  password,
  confirmPassword,
}: RegisterPayload): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>("/auth/register", {
      name,
      username,
      email,
      password,
      confirmPassword,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
};
