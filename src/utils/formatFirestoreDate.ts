import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export function formatFirestoreDate(timestamp: FirebaseFirestoreTypes.Timestamp): string {
  const date = timestamp.toDate();
  const day = date.toLocaleDateString('pt-BR');
  const hour = date.toLocaleTimeString('pt-BR');

  return `${day} às ${hour}`;
}
