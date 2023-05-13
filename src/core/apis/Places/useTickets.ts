import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

const useTickets = (place?: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let query = firestore().collection('tickets');

    query.onSnapshot(querySnapshot => {
      const data = [];

      querySnapshot.forEach(documentSnapshot => {
        data.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });

      setData(data);
      setLoading(false);
    });
  }, [place]);

  return {
    loading,
    data,
  };
};

export default useTickets;
