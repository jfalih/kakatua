import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
const useInvoice = (place?: string) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let query = firestore().collection('tickets').doc(place);

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
export default useInvoice;
