import { Input, IInputProps } from "native-base";
import { Controller, Control } from 'react-hook-form';

interface TextFieldProps extends IInputProps {
  control: Control;
  name: string;
}

export function TextField({ control, name, ...rest }: TextFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Input
          onChangeText={onChange}
          value={value}
          bg="gray.700"
          height={14}
          size="md"
          borderWidth={0}
          fontSize="md"
          fontFamily="body"
          color="white"
          placeholderTextColor="gray.300"
          _focus={{
            borderWidth: 1,
            borderColor: 'green.500',
            bg: 'gray.700',
          }}
          {...rest}
        />
      )}
    />
  )
}