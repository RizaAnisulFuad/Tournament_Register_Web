import { AxiosErrorResponse } from "@/services/api";
import {
  getExistingTeam,
  registerTeam,
  RegisterTeamPayload,
  RegisterTeamResponse,
  TeamsResponse,
} from "@/services/team";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";

export const useRegisterTeam = () => {
  const router = useRouter();
  const { mutate, isPending, isError, error } = useMutation<
    RegisterTeamResponse,
    AxiosError,
    RegisterTeamPayload
  >({
    mutationFn: registerTeam,
    onMutate: () => {
      toast.loading("Registering...");
    },
    onSuccess: (data) => {
      toast.dismiss();
      toast.success("Registration team successful");
      router.push("/team");
    },
    onError: (error) => {
      toast.dismiss();
      const dataError = error.response as unknown as AxiosErrorResponse;
      toast.error(dataError.message);
    },
  });

  return {
    registerTeam: mutate,
    isLoading: isPending,
    isError: isError,
    error: error,
  };
};
export const useGetTeams = () => {
  const { data, isError, isLoading, error } = useQuery<TeamsResponse>({
    queryKey: ["getTeams"],
    retry: 0,
    queryFn: getExistingTeam,
  });

  const teams = useMemo(() => {
    return data?.data;
  }, [data]);

  return {
    data: data,
    teamsList: teams,
    isError,
    isLoading,
  };
};
