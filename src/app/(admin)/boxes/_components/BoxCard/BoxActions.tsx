import { Button } from '@chakra-ui/react';

type Props = {
  isOpen?: boolean;
};

export default function Actions({ isOpen }: Props) {
  return (
    <footer className={`grid grid-cols-2 gap-x-2 bg-gray-200 px-4 py-2 ${!isOpen && 'bg-opacity-50'}`}>
      {isOpen ? (
        <>
          <Button colorScheme="red" size="xs">
            Cerrar
          </Button>
          <Button colorScheme="green" size="xs">
            Cargar
          </Button>
        </>
      ) : (
        <>
          <Button colorScheme="red" size="xs" className="group-hover:opacity-100">
            Eliminar
          </Button>
          <Button colorScheme="green" size="xs">
            Abrir Caja
          </Button>
        </>
      )}
    </footer>
  );
}
