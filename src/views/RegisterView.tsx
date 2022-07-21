import { Alert } from 'react-native';
import { VStack } from 'native-base';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { TextField } from '../components/TextField';

import { useOrder } from '../hooks/useOrder';

interface RegisterTextFieldData {
  patrimony: string;
  description: string;
}

const registerOrderSchema = yup.object({
  patrimony: yup.string().required('o patrimônio é obrigatório'),
  description: yup.string().required('a descrição é obrigatória'),
});

export function RegisterView() {
  const navigation = useNavigation();
  const { control, handleSubmit, formState } = useForm<RegisterTextFieldData>({
    resolver: yupResolver(registerOrderSchema),
  });
  const { errors } = formState;
  const { registerOrder, loading } = useOrder();

  async function handleRegisterOrder({ patrimony, description }: RegisterTextFieldData) {
    try {
      await registerOrder({ patrimony, description });
      Alert.alert('Cadastrar', 'Ordem cadastrada com sucesso.');
      navigation.goBack();
    } catch {
      Alert.alert('Cadastrar', 'Não foi possível cadastrar uma nova ordem.');
    }
  }

  return (
    <VStack
      flex={1}
      px={6}
      bg="gray.600"
    >
      <Header title="Solicitação" />
      <TextField
        control={control}
        error={errors.patrimony?.message}
        name="patrimony"
        placeholder="Número do Patrimônio"
        mt={4}
      />
      <TextField
        full
        control={control}
        error={errors.description?.message}
        multiline
        name="description"
        placeholder="Descrição do Problema"
        flex={1}
        mt={5}
        textAlignVertical="top"
      />
      <Button title="Cadastrar" mt={5} mb={10} onPress={handleSubmit(handleRegisterOrder)} isLoading={loading} />
    </VStack>
  );
}