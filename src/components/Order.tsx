import { HStack, Text, Box, useTheme, VStack, Circle, Pressable, IPressableProps } from "native-base";
import { CircleWavyCheck, ClockAfternoon, Hourglass } from "phosphor-react-native";
import { useMemo } from "react";

export interface OrderProps {
  id: string;
  patrimony: string;
  when: string;
  status: 'open' | 'closed';
}

interface InternalOrderProps extends IPressableProps {
  data: OrderProps;
}

export function Order({ data, ...rest }: InternalOrderProps) {
  const { colors } = useTheme();
  const statusColor = useMemo(() => data.status === 'open' ? colors.secondary[700] : colors.green[300], [data.status]);

  return (
    <Pressable {...rest}>
      <HStack
        bg="gray.600"
        mb={4}
        justifyContent="space-between"
        alignItems="center"
        rounded="sm"
        overflow="hidden"
      >
        <Box h="full" w={2} bg={statusColor} />
        <VStack
          flex={1}
          my={5}
          ml={5}
        >
          <Text
            color="white"
            fontSize="md"
          >
            Patrimônio {data.patrimony}
          </Text>

          <HStack alignItems="center">
            <ClockAfternoon size={15} color={colors.gray[300]} />
            <Text
              color="gray.200"
              fontSize="xs"
              ml={1}
            >
              {data.when}
            </Text>
          </HStack>
        </VStack>

        <Circle
          bg="gray.500"
          h={12}
          w={12}
          mr={5}
        >
          {data.status === 'closed' ? <CircleWavyCheck size={24} color={statusColor} /> : <Hourglass size={24} color={statusColor} />}
        </Circle>
      </HStack>
    </Pressable>
  );
}