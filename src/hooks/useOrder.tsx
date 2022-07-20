import { createContext, ReactNode, useContext, useState } from 'react';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import { formatFirestoreDate } from '../utils/formatFirestoreDate';

interface OrderContextProps {
  registerOrder: (payload: RegisterOrderProps) => Promise<void>;
  orderListener: (status: OrderStatus) => (() => void);
  getOrder: (orderId: string) => Promise<OrderDetailsProps | undefined>;
  closeOrder: (payload: CloseOrderProps) => Promise<void>;
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

interface CloseOrderProps {
  orderId: string;
  solution: string;
}

type OrderStatus = 'open' | 'closed';

export interface OrderProps {
  id: string;
  patrimony: string;
  when: string;
  status: OrderStatus;
}

export interface OrderDetailsProps extends OrderProps {
  description: string;
  solution: string | null;
  closed: string | null;
}

interface FirestoreOrder {
  patrimony: string;
  description: string;
  status: OrderStatus;
  created_at: FirebaseFirestoreTypes.Timestamp;
  solution?: string;
  closed_at?: FirebaseFirestoreTypes.Timestamp;
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
            when: created_at && formatFirestoreDate(created_at),
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

  async function getOrder(orderId: string): Promise<OrderDetailsProps | undefined> {
    setLoading(true);
    try {
      const dbOrder = await firestore().collection<FirestoreOrder>('orders').doc(orderId).get();
      if (dbOrder.exists) {
        const { patrimony, description, status, solution, created_at, closed_at } = dbOrder.data();

        return {
          id: orderId,
          patrimony,
          description,
          status,
          when: created_at && formatFirestoreDate(created_at),
          solution: solution || null,
          closed: closed_at ? formatFirestoreDate(closed_at) : null,
        } as OrderDetailsProps
      }
    } catch (error) {
      console.log(error);
      throw new Error('get_failed');
    } finally {
      setLoading(false);
    }
  }

  async function closeOrder({ orderId, solution }: CloseOrderProps): Promise<void> {
    setLoading(true);
    try {
      await firestore().collection('orders').doc(orderId).update({
        status: 'closed',
        solution,
        closed_at: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
      throw new Error('update_failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <OrderContext.Provider value={{ registerOrder, orderListener, getOrder, closeOrder, orders, loading }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder(): OrderContextProps {
  return useContext(OrderContext);
}
