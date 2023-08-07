import { Input, InputGroup, InputLeftElement, Spinner } from '@chakra-ui/react';
import { IconSearch } from '@tabler/icons-react';
import { useRef, useState } from 'react';

type Props = {
  value?: string;
  onChange?: (value?: string) => void;
};

export default function SearchInput({ value, onChange }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const debounceSearch = useRef<undefined | NodeJS.Timeout>();

  const handleChange = (value: string) => {
    if (debounceSearch.current) clearTimeout(debounceSearch.current);
    setIsLoading(true);
    debounceSearch.current = setTimeout(() => {
      setIsLoading(false);
      if (onChange) onChange(value);
    }, 500);
  };

  return (
    <InputGroup size="xs" flexGrow={1}>
      <InputLeftElement pointerEvents="none">
        {isLoading ? <Spinner size="xs" /> : <IconSearch size={14} />}
      </InputLeftElement>
      <Input
        bg="white"
        placeholder="Bucar transacción"
        onFocus={e => e.currentTarget.select()}
        onChange={({ currentTarget }) => handleChange(currentTarget.value)}
      />
    </InputGroup>
  );
}
