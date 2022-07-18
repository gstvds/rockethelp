import { Input, IInputProps } from "native-base";

export function TextField({ ...rest }: IInputProps) {
  return (
    <Input
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
  )
}