import { VStack } from 'native-base';
import { useForm } from 'react-hook-form';

import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { TextField } from '../components/TextField';

export function RegisterView() {
  const { control } = useForm();

  return (
    <VStack
      flex={1}
      p={6}
      bg="gray.600"
    >
      <Header title="Nova solicitação" />
      <TextField
        control={control}
        name="patrimony"
        placeholder="Número do patrimônio"
        mt={4}
      />
      <TextField
        control={control}
        multiline
        name="description"
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        textAlignVertical="top"
      />
      <Button title="Cadastrar" mt={5} />
    </VStack>
  );
}