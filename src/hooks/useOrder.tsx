import { createContext, ReactNode, useContext, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import { formatFirestoreDate } from '../utils/formatFirestoreDate';

interface OrderContextProps {
  registerOrder: (payload: RegisterOrderProps) => Promise<void>;
  orderListener: (status: OrderStatus) => (() => void);
  orders: OrderProps[];
  loading: boolean;
}

const OrderContext = createContext({} as OrderContextProps);

interface OrderProviderProps {
  children: ReactNode;
}

interface RegisterOrderProps {
  patrimony: string;
  description: string;
}

type OrderStatus = 'open' | 'closed';

export interface OrderProps {
  id: string;
  patrimony: string;
  when: string;
  status: OrderStatus;
}

export function OrderProvider({ children }: OrderProviderProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<OrderProps[]>([]);

  async function registerOrder({ patrimony, description }: RegisterOrderProps): Promise<void> {
    setLoading(true);
    try {
      await firestore().collection('orders').add({
        patrimony,
        description,
        status: 'open',
        created_at: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
      throw new Error('creation_failed');
    } finally {
      setLoading(false);
    }
  }

  function orderListener(status: OrderStatus): (() => void) {
    setLoading(true);
    try {
      const subscriber = firestore().collection('orders').where('status', '==', status).onSnapshot((snapshot) => {
        const parsedOrder = snapshot.docs.map((order) => {
          const { patrimony, description, status, created_at } = order.data();

          return {
            id: order.id,
            patrimony,
            description,
            status,
            when: formatFirestoreDate(created_at),
          };
        });
        setOrders(parsedOrder);
        setLoading(false);
      });

      return subscriber;
    } catch (error) {
      console.log(error);
      setLoading(false);
      throw new Error('creation_failed');
    }
  }

  return (
    <OrderContext.Provider value={{ registerOrder, orderListener, orders, loading }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder(): OrderContextProps {
  return useContext(OrderContext);
}
