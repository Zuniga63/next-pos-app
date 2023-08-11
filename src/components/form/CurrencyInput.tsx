'use client';

import { currencyFormat, currencyParse } from '@/utils';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  NumberInput,
  NumberInputField,
  ThemingProps,
  TypographyProps,
} from '@chakra-ui/react';

type Props = {
  label?: string;
  placeholder?: string;
  value?: string | number;
  textAlign?: TypographyProps['textAlign'];
  errorMessage?: string;
  helperText?: string;
  size?: ThemingProps<'NumberInput'>['size'];
  labelFontSize?: TypographyProps['fontSize'];
  onChange?: (value: number) => void;
  decimalSeparator?: '.' | ',';
  isRequired?: boolean;
};

export default function CurrencyInput({
  label,
  placeholder,
  textAlign,
  errorMessage,
  helperText,
  size,
  labelFontSize,
  value,
  onChange,
  isRequired,
}: Props) {
  const handleChange = (value: string) => {
    if (!onChange) return;
    const parseValue = parseFloat(value ? currencyParse(value) : '0');
    onChange(parseValue);
  };

  return (
    <FormControl isInvalid={Boolean(errorMessage)} isRequired={isRequired}>
      {label && (
        <FormLabel fontFamily="heading" fontSize={labelFontSize}>
          {label}
        </FormLabel>
      )}
      <NumberInput
        size={size}
        value={value}
        onChange={handleChange}
        format={currencyFormat}
        parse={currencyParse}
        pattern="\$ .{1\.}"
      >
        <NumberInputField placeholder={placeholder} textAlign={textAlign} />
      </NumberInput>
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
