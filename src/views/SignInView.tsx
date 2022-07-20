import { useState } from 'react';
import { Heading, Icon, useTheme, VStack } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';
import { useForm } from 'react-hook-form';
import auth from '@react-native-firebase/auth';

import Logo from '../assets/logo_primary.svg';

import { TextField } from '../components/TextField';
import { Button } from '../components/Button';
import { Alert } from 'react-native';
import { useAuth } from '../hooks/useAuth';

interface SignInTextFieldData {
  email: string;
  password: string;
}

export function SignInView() {
  const { colors } = useTheme();
  const { handleSubmit, control } = useForm();
  const { login, loading } = useAuth();

  async function handleSignIn({ email, password }: SignInTextFieldData) {
    if (!email || !password) {
      return Alert.alert('Entrar', 'O email e a senha precisam ser informados');
    }

    try {
      return await login({ email, password });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <TextField
        control={control}
        name="email"
        mb={4}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
        InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
      />
      <TextField
        control={control}
        name="password"
        mb={8}
        placeholder="Senha"
        type="password"
        autoComplete="password"
        textContentType="password"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
      />

      <Button
        title="Entrar"
        w="full"
        onPress={handleSubmit(handleSignIn)}
        isLoading={loading}
      />
    </VStack>
  );
}