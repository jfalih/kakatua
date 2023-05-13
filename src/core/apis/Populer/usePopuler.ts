import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

const usePopuler = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = firestore()
      .collection('populer')
      .onSnapshot(querySnapshot => {
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

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  return {
    loading,
    data,
  };
};

export default usePopuler;
