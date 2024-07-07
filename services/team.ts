import axiosInstance from "@/services/api";
import axios from "axios";
import { toast } from "sonner";

export interface Member {
  name: string;
  phone: string;
  gender: string;
}

export interface RegisterTeamPayload {
  teamName: string;
  members: Member[];
}

export interface RegisterTeamResponse {
  message: string;
  data: {
    _id: string;
    teamName: string;
    members: Member[];
    __v: number;
  };
}

export const registerTeam = async (
  payload: RegisterTeamPayload
): Promise<RegisterTeamResponse> => {
  try {
    const response = await axiosInstance.post<RegisterTeamResponse>(
      "/register/team",
      payload
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

export interface Member {
  _id: string;
  name: string;
  phone: string;
  gender: string;
}

export interface Team {
  _id: string;
  teamName: string;
  members: Member[];
  __v: number;
}

export interface TeamsResponse {
  message: string;
  data: Team[];
}

export const getExistingTeam = async (): Promise<TeamsResponse> => {
  try {
    const response = await axiosInstance.get<TeamsResponse>("/api/team/");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
};
