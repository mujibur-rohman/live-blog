import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';
import { auth, db, storage } from '../firebase/config';
import { useMutation } from '@apollo/client';
import { ADD_USERS } from '../graphql/mutation/userMutation';

export default function useRegister() {
  const [addUser] = useMutation(ADD_USERS);
  const register = async (email, password, displayName, photo) => {
    try {
      // Register Account
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // Upload Avatar
      const uploadPath = `avatar/${res.user.uid}/${photo.name}`;
      const refStorage = ref(storage, uploadPath);
      await uploadBytes(refStorage, photo);

      // Ambil Url Photo & Update photoURL dari user
      await getDownloadURL(refStorage)
        .then(async (url) => {
          await updateProfile(res.user, {
            displayName: displayName,
            photoURL: url,
          });
        })
        .catch((err) => console.log(err));

      // Tambah user ke database Hasura
      await addUser({
        variables: {
          id: res.user.uid,
          displayName: displayName,
          email: email,
          photoURL: res.user.photoURL,
        },
      });
      // Tambah user ke database
      await setDoc(doc(db, 'users', res.user.uid), {
        displayName: res.user.displayName,
        email: res.user.email,
        photoURL: res.user.photoURL,
        follower: [],
        following: [],
      });

      toast.success('Register Success, Redirecting...', {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'dark',
      });
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        toast.error('Email already in use', {
          position: 'bottom-center',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'dark',
        });
      }
    }
  };
  return register;
}
