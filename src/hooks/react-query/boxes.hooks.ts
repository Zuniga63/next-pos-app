import { createMinorBox, deleteMinorBox, getMinorBoxes, updateMinorBox } from '@/services/boxes.service';
import { ServerStateKeysEnum } from '@/utils/server-state-key.enum';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function useGetMinorBoxes() {
  return useQuery({
    queryKey: [ServerStateKeysEnum.MinorBoxes],
    queryFn: getMinorBoxes,
  });
}

export function useCreateMinorBox() {
  const toast = useToast({ position: 'top-left' });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMinorBox,
    onSuccess() {
      toast({
        title: '¡Caja Guardada!',
        status: 'success',
      });
      queryClient.invalidateQueries({ queryKey: [ServerStateKeysEnum.MinorBoxes] });
    },
    onError(error) {
      if (error instanceof Error) {
        if (axios.isAxiosError(error) && error.response) {
          const { data, status } = error.response;
          if ((status === 422 || status === 400) && data.errors) return;
        }

        toast({ title: '¡Opps, algo salio mal!', description: error.message, status: 'error' });
      }
    },
  });
}

export function useUpdateMinorBox() {
  const toast = useToast({ position: 'top-left' });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMinorBox,
    onSuccess() {
      toast({
        title: '¡Caja Actualizada!',
        status: 'success',
      });
      queryClient.invalidateQueries({ queryKey: [ServerStateKeysEnum.MinorBoxes] });
    },
    onError(error) {
      if (error instanceof Error) {
        if (axios.isAxiosError(error) && error.response) {
          const { data, status } = error.response;
          if ((status === 422 || status === 400) && data.errors) return;
        }

        toast({ title: '¡Opps, algo salio mal!', description: error.message, status: 'error' });
      }
    },
  });
}

export function useDeleteMinorBox() {
  const toast = useToast({ position: 'top-left' });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMinorBox,
    onSuccess(data) {
      console.log(data);
      toast({
        title: '¡Caja Eliminada!',
        description: `${data.name} fue eliminada permanentemente del sistema.`,
        status: 'success',
      });
      queryClient.invalidateQueries({ queryKey: [ServerStateKeysEnum.MinorBoxes] });
    },
    onError(error) {
      console.log(error);
      toast({ title: '¡Opp, algo salio mal!', description: 'No se pudo ser eliminada', status: 'error' });
    },
  });
}
