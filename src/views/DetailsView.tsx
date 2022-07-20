import { Box, Text, VStack } from 'native-base';
import { useRoute } from '@react-navigation/native';

import { Header } from '../components/Header';

interface DetailsViewRouteParams {
  orderId: string;
}

export function DetailsView() {
  const route = useRoute();
  const { orderId } = route.params as DetailsViewRouteParams;

  return (
    <VStack
      flex={1}
      bg="gray.700"
    >
      <Box p={6} bg="gray.600">
        <Header title="Solicitação" />
      </Box>
      <VStack
        flex={1}
      >
        <Text color="white">{orderId}</Text>
      </VStack>
    </VStack>
  );
}