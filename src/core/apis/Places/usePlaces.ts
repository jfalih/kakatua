import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
const usePlaces = (search?: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let query = firestore().collection('places');

    if (search) {
      query = query
        .where('name', '>=', search)
        .where('name', '<=', search + '\uf8ff');
    }
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
  }, [search]);

  return {
    loading,
    data,
  };
};

const usePlace = (place?: string) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let query = firestore().collection('places').doc(place);

    const subscriber = query.onSnapshot(querySnapshot => {
      setData({
        ...querySnapshot.data(),
        key: querySnapshot.id,
      });
      setLoading(false);
    });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, [place]);

  return {
    loading,
    data,
  };
};

export {usePlace};
export default usePlaces;
