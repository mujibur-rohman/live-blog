import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';

export default function useAuth() {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    const unsub = onSnapshot(
      query(collection(db, 'users')),
      (snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.id === user?.uid) {
            setFollowers([...doc.data().follower]);
            setFollowing([...doc.data().following]);
          }
        });
      },
      (error) => console.log(error)
    );

    return () => {
      unsub();
    };
  }, [user?.uid]);

  const logout = async () => {
    setLoading(true);
    await auth.signOut();
  };

  return { user, loading, logout, followers, following };
}
