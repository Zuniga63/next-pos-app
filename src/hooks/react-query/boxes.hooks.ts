import { addTransactionToMinorBox } from '@/logic/boxes-logic';
import {
  closeMinorBox,
  createMinorBox,
  deleteMinorBox,
  deleteTransaction,
  getGlobalTransactions,
  getMinorBox,
  getMinorBoxes,
  openMinorBox,
  storeCashTransfer,
  storeTransaction,
  updateMinorBox,
} from '@/services/boxes.service';
import { IBox, ICashboxFull, ITransaction } from '@/types';
import { currencyFormat } from '@/utils';
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

export function useGetMinorBox({ id }: { id?: string }) {
  return useQuery({
    queryKey: [ServerStateKeysEnum.MinorBox, id],
    queryFn: () => getMinorBox({ id }),
  });
}

export function useGetGlobalTransactions({ enabled = false }: { enabled?: boolean }) {
  return useQuery({
    queryKey: [ServerStateKeysEnum.GlobalTransactions],
    queryFn: getGlobalTransactions,
    enabled: enabled,
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

export function useOpenMinorBox() {
  const toast = useToast({ position: 'top-left' });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: openMinorBox,
    onSuccess(data) {
      toast({
        title: `¡${data.name} ahora está abierta!`,
        status: 'success',
      });
      queryClient.setQueriesData(
        [ServerStateKeysEnum.MinorBoxes],
        (old: IBox[] | undefined) => old?.map(item => (item.id === data.id ? data : item)),
      );
    },
    onError(error) {
      if (error instanceof Error) {
        if (axios.isAxiosError(error) && error.response) {
          const { data, status } = error.response;
          if ((status === 422 || status === 400) && data.errors) return;
          if (status === 404) queryClient.invalidateQueries({ queryKey: [ServerStateKeysEnum.MinorBoxes] });
        }

        toast({ title: '¡Opps, algo salio mal!', description: error.message, status: 'error' });
      }
    },
  });
}

export function useCloseMinorBox() {
  const toast = useToast({ position: 'top-left' });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: closeMinorBox,
    onSuccess(data, variables) {
      toast({
        title: `¡Se ha cerrado ${data.name} con ${currencyFormat(variables.cash)}!`,
        status: 'success',
      });
      queryClient.setQueriesData(
        [ServerStateKeysEnum.MinorBoxes],
        (old: IBox[] | undefined) => old?.map(item => (item.id === data.id ? data : item)),
      );
    },
    onError(error) {
      if (error instanceof Error) {
        if (axios.isAxiosError(error) && error.response) {
          const { data, status } = error.response;
          if ((status === 422 || status === 400) && data.errors) return;
          if (status === 404) queryClient.invalidateQueries({ queryKey: [ServerStateKeysEnum.MinorBoxes] });
        }

        toast({ title: '¡Opps, algo salio mal!', description: error.message, status: 'error' });
      }
    },
  });
}

export function useDeleteTransaction() {
  const toast = useToast({ position: 'top-left' });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess(data, variables) {
      if (variables.boxId) queryClient.invalidateQueries([ServerStateKeysEnum.MinorBox, variables.boxId]);
      if (variables.isGlobal) queryClient.invalidateQueries([ServerStateKeysEnum.GlobalTransactions]);
      queryClient.invalidateQueries([ServerStateKeysEnum.MinorBoxes]);
    },
    onError(error) {
      if (error instanceof Error) {
        if (axios.isAxiosError(error) && error.response) {
          const { data, status } = error.response;
          if ((status === 422 || status === 400) && data.errors) return;
          if (status === 404) {
            queryClient.invalidateQueries([ServerStateKeysEnum.MinorBox]);
            queryClient.invalidateQueries([ServerStateKeysEnum.MinorBoxes]);
          }
        }

        toast({ title: '¡Opps, algo salio mal!', description: error.message, status: 'error' });
      }
    },
  });
}

export function useStoreTransaction() {
  const toast = useToast({ position: 'top-left' });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: storeTransaction,
    onSuccess(data, variables) {
      const { boxId, isGlobal } = variables;
      if (boxId) {
        queryClient.setQueryData([ServerStateKeysEnum.MinorBox, boxId], (old: ICashboxFull | undefined) => {
          return addTransactionToMinorBox(old, data);
        });
      } else if (isGlobal) {
        queryClient.setQueryData([ServerStateKeysEnum.GlobalTransactions], (old: ITransaction[] | undefined) => {
          if (!old) return old;
          const balance = old.reduce((balance, { amount }) => balance + amount, 0) + data.amount;
          data.balance = balance;
          return [...old, data];
        });
      }

      queryClient.invalidateQueries([ServerStateKeysEnum.MinorBoxes]);
      toast({ title: '¡Transacción Registrada!', status: 'success' });
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

export function useStoreCashTransfer() {
  const toast = useToast({ position: 'top-left' });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: storeCashTransfer,
    onSuccess(data, variables) {
      if (variables.data.senderBoxId) {
        queryClient.setQueryData(
          [ServerStateKeysEnum.MinorBox, variables.data.senderBoxId],
          (old: ICashboxFull | undefined) => {
            return addTransactionToMinorBox(old, data.senderTransaction);
          },
        );
      }
      queryClient.invalidateQueries([ServerStateKeysEnum.MinorBoxes]);
      toast({ title: 'Transferencia Registrada!', status: 'success' });
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
