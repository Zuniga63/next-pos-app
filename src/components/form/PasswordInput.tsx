'use client';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { IconEyeOff, IconEye, IconLockAccess } from '@tabler/icons-react';
import { ChangeEvent, useState } from 'react';

type Props = {
  name?: string;
  value?: string;
  isRequired?: boolean;
  label?: string;
  placeholder?: string;
  onChange?(value: string): void;
  className?: string;
  error?: string;
};

export default function PasswordInput({
  name,
  value,
  isRequired,
  label,
  onChange,
  placeholder = 'password',
  className,
  error,
}: Props) {
  const [show, setShow] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event.target.value);
  };

  const handleClick = () => setShow(!show);

  return (
    <FormControl isRequired={isRequired} className={className} isInvalid={Boolean(error)}>
      {label && <FormLabel className="text-dark">{label}</FormLabel>}
      <InputGroup size="md">
        <InputLeftElement pointerEvents="none" className="text-dark">
          <IconLockAccess size={20} stroke={2} />
        </InputLeftElement>
        <Input
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          className="text-dark"
          backgroundColor="white"
          value={value}
          onChange={handleChange}
          onFocus={e => e.currentTarget.select()}
          name={name}
          autoComplete="password"
        />
        <InputRightElement width="4.5rem" className="text-dark">
          <Button h="1.75rem" size="sm" variant="ghost" onClick={handleClick}>
            {show ? (
              <IconEyeOff className="text-inherit" size={20} stroke={2} />
            ) : (
              <IconEye className="text-inherit" size={20} stroke={2} />
            )}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}
