import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

type Props = {
  value?: Date | null;
  className?: string;
  placeholder?: string;
  isClearable?: boolean;
  isDisabled?: boolean;
  minDate?: Date | null;
  maxDate?: Date | null;
  onChange?: (value: Date | null) => void;
};

export default function CustomDatePicker({
  value,
  placeholder,
  className,
  isClearable,
  isDisabled,
  minDate,
  maxDate,
  onChange,
}: Props) {
  const handleChange = (newValue: Date | null) => {
    if (!onChange) return;
    onChange(newValue);
  };

  return (
    <DatePicker
      selected={value}
      disabled={isDisabled}
      minDate={minDate}
      maxDate={maxDate}
      onChange={handleChange}
      placeholderText={placeholder}
      isClearable={isClearable}
      showTimeSelect
      timeCaption="Hora"
      timeFormat="hh:mm aa"
      dateFormat="MMMM d, yyyy hh:mm aa"
      className={className}
      wrapperClassName="w-full"
    />
  );
}
