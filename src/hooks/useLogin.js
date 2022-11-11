import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../firebase/config';

export default function useLogin() {
  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success('Login Success, Redirecting...', {
          position: 'bottom-center',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'dark',
        });
      })
      .catch((err) => {
        console.log(err.code);
        if (err.code === 'auth/wrong-password') {
          toast.error('Wrong Password', {
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
        if (err.code === 'auth/user-not-found') {
          toast.error('Email not registered', {
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
      });
  };
  return login;
}
