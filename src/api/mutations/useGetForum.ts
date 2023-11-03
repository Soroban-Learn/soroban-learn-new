import type { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { useRecoilState } from "recoil";
import { forumState } from "@/store";
import { queryClient } from "../queryClient";
import type { ForumResponse } from "@/types";

interface IGetForum {
  username: string;
  email: string;
}

const QUERY_KEY = ["Forum"];

const getForum = async (params: IGetForum) => {
  const { data } = await apiClient.post("/auth/forum/login", {
    username: params.username,
    email: params.email,
  });

  return data;
};

export const useForumLogin = () => {
  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const queryClient = useQueryClient();
  const [, setForumAuth] = useRecoilState(forumState);

  return useMutation<void, AxiosError, IGetForum>(getForum, {
    onSuccess: (data: any) => {
      if (data.authtoken) {
        openInNewTab(
          `https://forum.sorobanlearn.com/?authtoken=${data.authtoken}&remember=1`
        );
      }
      queryClient.invalidateQueries([QUERY_KEY]);
    },

    onError: (error: AxiosError) => {
      // Handle Error
    },
  });
};
