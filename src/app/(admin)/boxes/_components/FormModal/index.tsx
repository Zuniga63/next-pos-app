'use client';

import { IBox } from '@/types';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ThemingProps,
} from '@chakra-ui/react';
import CashboxCard from './CashboxCard';
import { FormEvent, ReactNode, useId } from 'react';
import { IconDeviceFloppy } from '@tabler/icons-react';

type Props = {
  title: string;
  isOpen: boolean;
  isLoading?: boolean;
  cashbox?: IBox | null;
  children?: ReactNode;
  submitColorScheme?: ThemingProps<'Button'>['colorScheme'];
  submitLoadingText?: string;
  submitText?: string;
  onClose?: () => void;
  onSubmit?: () => void;
};

export default function FormModal({
  title,
  isOpen,
  isLoading,
  cashbox,
  children,
  submitText = 'Guardar',
  submitColorScheme = 'blue',
  submitLoadingText,
  onClose,
  onSubmit,
}: Props) {
  const formId = useId();

  const handleClose = () => {
    if (isLoading || !onClose) return;
    onClose();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} closeOnOverlayClick={!isLoading} colorScheme="green">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontFamily="heading">{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CashboxCard cashbox={cashbox} />

          <form onSubmit={handleSubmit} id={formId}>
            {children}
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme={submitColorScheme}
            form={formId}
            type="submit"
            isLoading={isLoading}
            loadingText={submitLoadingText}
            leftIcon={<IconDeviceFloppy size={16} stroke={1.5} />}
          >
            {submitText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
