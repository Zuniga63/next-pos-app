import { deleteMinorBox, getMinorBoxes } from '@/services/boxes.service';
import { ServerStateKeysEnum } from '@/utils/server-state-key.enum';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useGetMinorBoxes() {
  return useQuery({
    queryKey: [ServerStateKeysEnum.MinorBoxes],
    queryFn: getMinorBoxes,
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
        title: '¡Caja Guardada!',
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
