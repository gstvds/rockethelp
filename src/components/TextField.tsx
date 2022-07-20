import { Input, IInputProps, Text } from "native-base";
import { Controller } from 'react-hook-form';

interface TextFieldProps extends IInputProps {
  // Setting this as Control is not working right now: https://github.com/react-hook-form/react-hook-form/issues/8689
  // control: Control
  control: any;
  name: string;
  error: string;
}

export function TextField({ control, name, error, ...rest }: TextFieldProps) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
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
              borderColor: 'green.500',
              bg: 'gray.700',
            }}
            {...rest}
          />
        )}
      />
      {!!error && (
        <Text
          fontSize="md"
          mt={2}
          color="red.300"
        >
          {error}
        </Text>
      )}
    </>
  )
}