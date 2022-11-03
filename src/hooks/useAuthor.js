import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

const useAuthor = (uid) => {
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, 'users')),
      (snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.id === uid) {
            setAuthor({ id: doc.id, ...doc.data() });
          }
        });
      },
      (error) => console.log(error)
    );

    return () => {
      unsub();
    };
  }, [uid]);
  return author;
};

export default useAuthor;
