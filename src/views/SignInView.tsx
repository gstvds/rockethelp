import { Heading, Icon, useTheme, VStack } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Logo from '../assets/logo_primary.svg';

import { TextField } from '../components/TextField';
import { Button } from '../components/Button';
import { Alert } from 'react-native';
import { useAuth } from '../hooks/useAuth';

interface SignInTextFieldData {
  email: string;
  password: string;
}

const signInSchema = yup.object({
  email: yup.string().email('e-mail inválido').required('e-mail obrigatório'),
  password: yup.string().required('senha obrigatória'),
});

export function SignInView() {
  const { colors } = useTheme();
  const { handleSubmit, control, formState, setError } = useForm<SignInTextFieldData>({
    resolver: yupResolver(signInSchema),
  });
  const { errors } = formState;
  const { login, loading } = useAuth();

  async function handleSignIn({ email, password }: SignInTextFieldData) {
    try {
      return await login({ email, password });
    } catch (error) {
      if (error.message === 'invalid_credentials') {
        setError('password', { message: 'e-mail ou senha inválidos' });
        setError('email', { message: 'e-mail ou senha inválidos' });
      } else if (error.message === 'invalid_email') {
        setError('email', { message: 'e-mail inválido' });
      } else {
        Alert.alert('Entrar', 'Algo deu errado. Tente novamente mais tarde.');
      }
    }
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>
      <VStack space={4} w="full">
        <TextField
          control={control}
          error={errors.email?.message}
          name="email"
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          InputLeftElement={<Icon as={<Envelope color={!!errors.email?.message ? colors.error[600] : colors.gray[300]} />} ml={4} />}
        />
        <TextField
          control={control}
          error={errors.password?.message}
          name="password"
          placeholder="Senha"
          type="password"
          autoComplete="password"
          textContentType="password"
          onSubmitEditing={handleSubmit(handleSignIn)}
          InputLeftElement={<Icon as={<Key color={!!errors.password?.message ? colors.error[600] : colors.gray[300]} />} ml={4} />}
        />
      </VStack>
      <Button
        title="Entrar"
        w="full"
        mt={4}
        onPress={handleSubmit(handleSignIn)}
        isLoading={loading}
      />
    </VStack>
  );
}