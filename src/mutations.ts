import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

import type {
  ITrack,
  OptimisticGetTracksQueryResultPartial,
  TTrackForm,
} from "@/types";
import { unwrapResult } from "@/lib/unwrapResult";
import type { GetTracksQueryResult } from "@/queries";
import { useTracksStateParams } from "@/hooks/useTracksStateParams";
import {
  createTrackApi,
  deleteAudioFileApi,
  deleteTrackApi,
  editTrackApi,
  uploadAudioFileApi,
} from "@/lib/api";

export const useCreateTrack = () => {
  const queryClient = useQueryClient();
  const params = useTracksStateParams();

  return useMutation({
    mutationKey: ["createTrack"],
    mutationFn: async (formData) => {
      const result = await createTrackApi(formData);
      return unwrapResult(result);
    },
    onMutate: async (newTrack: TTrackForm) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: ["tracks", params],
      });

      // Snapshot the previous value
      const previousTracks = queryClient.getQueryData(["tracks", params]);

      // Optimistically update to the new value
      queryClient.setQueryData<OptimisticGetTracksQueryResultPartial>(
        ["tracks", params],
        (old) => {
          if (!old) return;

          const newData = old.data;
          newData.pop();
          newData.unshift({
            id: "optimistic",
            ...newTrack,
          });

          const newTotal = old.meta.total + 1;
          const newTotalPages = Math.ceil(newTotal / old.meta.limit);

          const newMeta = {
            ...old.meta,
            total: newTotal,
            totalPages: newTotalPages,
          };

          return {
            data: newData,
            meta: newMeta,
          };
        },
      );

      // Return a context object with the snapshotted value
      return { previousTracks };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        ["tracks", params],
        context?.previousTracks ?? {},
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["tracks", params] }),
  });
};

export const useEditTrack = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const params = useTracksStateParams();

  return useMutation({
    mutationKey: ["editTrack"],
    mutationFn: async (formData) => {
      const result = await editTrackApi(id, formData);
      return unwrapResult(result);
    },
    onMutate: async (updatedTrack: TTrackForm) => {
      await queryClient.cancelQueries({
        queryKey: ["tracks", params],
      });

      const previousTracks = queryClient.getQueryData(["tracks", params]);

      queryClient.setQueryData<OptimisticGetTracksQueryResultPartial>(
        ["tracks", params],
        (old) => {
          if (!old) return;

          const updatedData = old.data.map((item) =>
            item.id === id ? { id, ...updatedTrack } : item,
          );

          return {
            ...old,
            data: updatedData,
          };
        },
      );

      return { previousTracks };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        ["tracks", params],
        context?.previousTracks ?? {},
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["tracks", params] }),
  });
};

export const useDeleteTrack = ({ id }: { id: string }): UseMutationResult => {
  const queryClient = useQueryClient();
  const params = useTracksStateParams();

  return useMutation({
    mutationKey: ["deleteTrack"],
    mutationFn: async () => {
      const result = await deleteTrackApi(id);
      return unwrapResult(result);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["tracks", params],
      });

      const previousTracks = queryClient.getQueryData(["tracks", params]);

      queryClient.setQueryData<GetTracksQueryResult>(
        ["tracks", params],
        (old) => {
          if (!old) return;

          const updatedData = old.data.filter((item) => item.id !== id);

          const newTotal = old.meta.total - 1;
          const newTotalPages = Math.ceil(newTotal / old.meta.limit);

          const newMeta = {
            ...old.meta,
            total: newTotal,
            totalPages: newTotalPages,
          };

          return {
            data: updatedData,
            meta: newMeta,
          };
        },
      );

      return { previousTracks };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        ["tracks", params],
        context?.previousTracks ?? {},
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["tracks", params] }),
  });
};

export const useUploadAudioFile = ({
  id,
}: {
  id: string;
}): UseMutationResult<ITrack, Error, FormData> => {
  return useMutation({
    mutationKey: ["uploadAudioFile", id],
    mutationFn: async (formData) => {
      const result = await uploadAudioFileApi(id, formData);
      return unwrapResult(result);
    },
  });
};

export const useDeleteAudioFile = ({
  id,
}: {
  id: string;
}): UseMutationResult => {
  const queryClient = useQueryClient();
  const params = useTracksStateParams();

  return useMutation({
    mutationKey: ["deleteAudioFile", id],
    mutationFn: async () => {
      const result = await deleteAudioFileApi(id);
      return unwrapResult(result);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["tracks", params],
      });

      const previousTracks = queryClient.getQueryData(["tracks", params]);

      queryClient.setQueryData<GetTracksQueryResult>(
        ["tracks", params],
        (old) => {
          if (!old) return;

          const updatedData = old.data.map((item) =>
            item.id === id ? { ...item, audioFile: "" } : item,
          );

          return {
            ...old,
            data: updatedData,
          };
        },
      );

      return { previousTracks };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        ["tracks", params],
        context?.previousTracks ?? {},
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["tracks", params] }),
  });
};
