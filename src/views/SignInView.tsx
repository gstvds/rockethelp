import { Heading, Icon, useTheme, VStack } from "native-base";
import { Envelope, Key } from 'phosphor-react-native';

import Logo from '../assets/logo_primary.svg';

import { TextField } from "../components/TextField";
import { Button } from '../components/Button';

export function SignInView() {
  const { colors } = useTheme();
  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <TextField
        mb={4}
        placeholder="E-mail"
        keyboardType="email-address"
        InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
      />
      <TextField
        mb={8}
        placeholder="Senha"
        type="password"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
      />

      <Button title="Entrar" w="full" />
    </VStack>
  );
}