import { Input, IInputProps, Text, FormControl, useTheme } from "native-base";
import { Controller } from 'react-hook-form';

interface TextFieldProps extends IInputProps {
  // Setting this as Control is not working right now: https://github.com/react-hook-form/react-hook-form/issues/8689
  // control: Control
  control: any;
  name: string;
  error?: string;
  full?: boolean;
}

export function TextField({ control, name, error, full, ...rest }: TextFieldProps) {
  const { fontSizes } = useTheme();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <FormControl isInvalid={!!error} flex={full ? 1 : null}>
          <Input
            onChangeText={onChange}
            value={value}
            bg="gray.700"
            h={14}
            w="full"
            size="md"
            borderWidth={0}
            fontSize="md"
            fontFamily="body"
            color="white"
            placeholderTextColor="gray.300"
            _focus={{
              borderWidth: 1,
              borderColor: !!error ? 'error.600' : 'green.500',
              bg: 'gray.700',
            }}
            _invalid={{
              borderWidth: 1,
              borderColor: 'error.600',
            }}
            {...rest}
          />
          <FormControl.ErrorMessage
            _text={{
              fontSize: fontSizes["md"]
            }}
          >
            {error}
          </FormControl.ErrorMessage>
        </FormControl>
      )}
    />
  )
}