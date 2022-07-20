import { useEffect, useState } from 'react';
import { Box, HStack, ScrollView, Text, useTheme, VStack } from 'native-base';
import { useRoute, useNavigation } from '@react-navigation/native';
import { CircleWavyCheck, Clipboard, DesktopTower, Hourglass } from 'phosphor-react-native';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { CardDetails } from '../components/CardDetails';
import { TextField } from '../components/TextField';

import { OrderDetailsProps, useOrder } from '../hooks/useOrder';
import { useForm } from 'react-hook-form';
import { Button } from '../components/Button';
import { Alert } from 'react-native';

interface DetailsViewRouteParams {
  orderId: string;
}

interface CloseOrderTextFieldData {
  solution: string;
}

const closeOrderSchema = yup.object({
  solution: yup.string().required('a solução é obrigatória'),
});

export function DetailsView() {
  const navigation = useNavigation();
  const route = useRoute();
  const { orderId } = route.params as DetailsViewRouteParams;
  const { colors } = useTheme();
  const { getOrder, closeOrder, loading: ordersLoading } = useOrder();
  const { control, handleSubmit, formState } = useForm<CloseOrderTextFieldData>({
    resolver: yupResolver(closeOrderSchema),
  });
  const { errors } = formState;
  const [order, setOrder] = useState<OrderDetailsProps>({} as OrderDetailsProps);

  async function retrieveOrder() {
    const retrievedOrder = await getOrder(orderId);
    setOrder(retrievedOrder);
  }

  async function handleCloseOrder({ solution }: CloseOrderTextFieldData) {
    try {
      await closeOrder({ orderId, solution });
      Alert.alert('Solicitação', 'Solicitação encerrada com sucesso.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Solicitação', 'Não foi possível encerrar a solicitação.');
    }
  }

  useEffect(() => {
    retrieveOrder();
  }, [orderId]);

  if (ordersLoading) return <Loading />

  return (
    <VStack
      flex={1}
      bg="gray.700"
    >
      <Box px={6} bg="gray.600">
        <Header title="Solicitação" />
      </Box>
      <VStack
        flex={1}
      >
        <HStack
          bg="gray.500"
          justifyContent="center"
          p={4}
        >
          {order.status === 'closed' ? (
            <CircleWavyCheck size={22} color={colors.green[300]} />
          ) : (
            <Hourglass size={22} color={colors.secondary[700]} />
          )}
          <Text
            fontSize="sm"
            color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
            ml={2}
            textTransform="uppercase"
          >
            {order.status === 'closed' ? 'finalizado' : 'em andamento'}
          </Text>
        </HStack>
        <ScrollView
          mx={5}
          showsVerticalScrollIndicator={false}
        >
          <CardDetails
            title="equipamento"
            description={`Patrimônio ${order.patrimony}`}
            icon={DesktopTower}
            footer={order.when}
          />
          <CardDetails
            title="descrição do problema"
            description={order.description}
            icon={Clipboard}
          />
          <CardDetails
            title="solução"
            icon={CircleWavyCheck}
            description={order.solution}
            footer={order.closed && `Encerrado em ${order.closed}`}
          >
            {order.status === 'open' && (
              <TextField
                multiline
                control={control}
                name="solution"
                h={24}
                placeholder="Descrição da solução"
                textAlignVertical="top"
              />
            )}
          </CardDetails>
        </ScrollView>
        {!order.closed && (
          <Button
            isLoading={ordersLoading}
            title="Encerrar solicitação"
            m={5}
            onPress={handleSubmit(handleCloseOrder)}
          />
        )}
      </VStack>
    </VStack>
  );
}