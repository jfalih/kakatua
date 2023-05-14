import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
const usePlaces = (search?: string, categoryId?: number) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let query = firestore().collection('places');

    if (categoryId) {
      const catRef = firestore().collection('cities').doc(categoryId);
      query = query.where('cities', '==', catRef);
    }
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
  }, [search, categoryId]);

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

const useShop = (place?: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let query = firestore().collection('shop');

    if (place) {
      const placeRef = firestore().collection('places').doc(place);
      query = query.where('lokasi', '==', placeRef);
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
  }, [place]);

  return {
    loading,
    data,
  };
};

const useFoods = (place?: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let query = firestore().collection('foods');

    if (place) {
      const placeRef = firestore().collection('places').doc(place);
      query = query.where('lokasi', '==', placeRef);
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
  }, [place]);

  return {
    loading,
    data,
  };
};

const useLandmark = (landmark?: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let query = firestore()
      .collection('places')
      .where('apiName', '==', landmark);
    query.onSnapshot(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        setData({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      setLoading(false);
    });
  }, [landmark]);

  return {
    data,
    loading,
  };
};
export {usePlace, useShop, useLandmark, useFoods};
export default usePlaces;
