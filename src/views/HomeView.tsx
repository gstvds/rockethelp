import { useEffect, useState } from 'react';
import { Heading, HStack, IconButton, Text, useTheme, VStack, FlatList, Center } from 'native-base';
import { ChatTeardropText, SignOut } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

import Logo from '../assets/logo_secondary.svg';

import { Filter } from '../components/Filter';
import { Order } from '../components/Order';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';

import { useAuth } from '../hooks/useAuth';
import { useOrder } from '../hooks/useOrder';

export function HomeView() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { logout, loading: authLoading } = useAuth();
  const { orderListener, orders, loading: ordersLoading } = useOrder();
  const [selectedFilter, setSelectedFilter] = useState<'open' | 'closed'>('open');

  function handleSelectOpenFilter() {
    return setSelectedFilter('open');
  }

  function handleSelectClosedFilter() {
    return setSelectedFilter('closed')
  }

  function handleNewOrder() {
    return navigation.navigate('RegisterView');
  }

  function handleOpenDetailsView(orderId: string) {
    return navigation.navigate('DetailsView', { orderId });
  }

  async function handleLogout() {
    return await logout();
  }

  useEffect(() => {
    const subscriber = orderListener(selectedFilter);

    return subscriber;
  }, [selectedFilter]);

  return (
    <VStack flex={1} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />
        <IconButton
          icon={
            <SignOut
              size={26}
              color={colors.gray[300]}
            />
          }
          onPress={handleLogout}
        />
      </HStack>
      <VStack
        flex={1}
        px={6}
      >
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">
            Solicitações
          </Heading>
          <Text color="gray.200">
            {orders.length}
          </Text>
        </HStack>
        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="Em andamento"
            isActive={selectedFilter === 'open'}
            onPress={handleSelectOpenFilter}
          />
          <Filter
            type="closed"
            title="Finalizados"
            isActive={selectedFilter === 'closed'}
            onPress={handleSelectClosedFilter}
          />
        </HStack>
        {ordersLoading ? (
          <Loading />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            data={orders}
            keyExtractor={(order) => order.id}
            renderItem={({ item }) => (
              <Order data={item} onPress={() => handleOpenDetailsView(item.id)} />
            )}
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropText color={colors.gray[300]} size={40} />
                <Text
                  color="gray.300"
                  fontSize="xl"
                  mt={6}
                  textAlign="center"
                >
                  Você não possui{'\n'}solicitações {selectedFilter === 'open' ? 'em andamento' : 'finalizadas'}
                </Text>
              </Center>
            )}
          />
        )}
        <Button
          title="Nova solicitação"
          onPress={handleNewOrder}
          isLoading={authLoading || ordersLoading}
          mb={10}
        />
      </VStack>
    </VStack>
  );
}