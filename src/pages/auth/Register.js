import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import useRegister from '../../hooks/useRegister';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const register = useRegister();

  const initialValues = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    photo: null,
  };
  const validationSchema = yup.object({
    displayName: yup.string().required().trim(),
    email: yup.string().required().email().trim(),
    password: yup.string().required().trim().min(6),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'password must match')
      .required(),
    photo: yup.mixed().required(),
  });

  const onSubmit = async (values) => {
    await register(
      values.email,
      values.password,
      values.displayName,
      values.photo
    );
  };

  return (
    <div className="bg-primary h-fit px-10 pb-10">
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="dark"
      />
      <div className="bg-white mt-16 flex flex-col gap-4 mx-auto w-3/3 md:w-1/2 lg:w-1/3 p-4 rounded-lg">
        <p className="text-2xl pl-3 font-bold text-primary text-center">
          Register
        </p>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {(props) => {
            return (
              <Form className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="text-sm flex border-[1px] overflow-ellipsis">
                    <Field
                      type="text"
                      name="displayName"
                      className="w-full outline-none px-2 py-2"
                      placeholder="Display Name"
                    />
                    <div className="bg-primary w-10 grid place-items-center">
                      <UserIcon className="w-5 text-white" />
                    </div>
                  </div>
                  <ErrorMessage name="displayName">
                    {(err) => (
                      <span className="text-red-500 text-xs">{err}</span>
                    )}
                  </ErrorMessage>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-sm flex border-[1px] overflow-ellipsis">
                    <Field
                      name="email"
                      type="text"
                      className="w-full outline-none px-2 py-2"
                      placeholder="Email"
                    />
                    <div className="bg-primary w-10 grid place-items-center">
                      <EnvelopeIcon className="w-5 text-white" />
                    </div>
                  </div>
                  <ErrorMessage name="email">
                    {(err) => (
                      <span className="text-red-500 text-xs">{err}</span>
                    )}
                  </ErrorMessage>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-sm flex border-[1px] overflow-ellipsis">
                    <Field
                      name="password"
                      type={`${showPassword ? 'text' : 'password'}`}
                      className="w-full outline-none px-2 py-2"
                      placeholder="Password"
                    />
                    <div className="w-10 grid place-items-center cursor-pointer">
                      {showPassword ? (
                        <EyeIcon
                          className="w-4 text-gray-400"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <EyeSlashIcon
                          className="w-4 text-gray-400"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )}
                    </div>
                    <div className="bg-primary w-11 grid place-items-center">
                      <LockClosedIcon className="w-5 text-white" />
                    </div>
                  </div>
                  <ErrorMessage name="password">
                    {(err) => (
                      <span className="text-red-500 text-xs">{err}</span>
                    )}
                  </ErrorMessage>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-sm flex border-[1px] overflow-ellipsis">
                    <Field
                      name="confirmPassword"
                      type={`${showCPassword ? 'text' : 'password'}`}
                      className="w-full outline-none px-2 py-2"
                      placeholder="Confirm Password"
                    />
                    <div className="w-10 grid place-items-center cursor-pointer">
                      {showCPassword ? (
                        <EyeIcon
                          className="w-4 text-gray-400"
                          onClick={() => setShowCPassword(!showCPassword)}
                        />
                      ) : (
                        <EyeSlashIcon
                          className="w-4 text-gray-400"
                          onClick={() => setShowCPassword(!showCPassword)}
                        />
                      )}
                    </div>
                    <div className="bg-primary w-11 grid place-items-center">
                      <LockClosedIcon className="w-5 text-white" />
                    </div>
                  </div>
                  <ErrorMessage name="confirmPassword">
                    {(err) => (
                      <span className="text-red-500 text-xs">{err}</span>
                    )}
                  </ErrorMessage>
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  <label>Photo Profile</label>
                  <input
                    className="text-sm"
                    type="file"
                    name="photo"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={(e) =>
                      props.setFieldValue('photo', e.target.files[0])
                    }
                  />
                  <ErrorMessage name="photo">
                    {(err) => (
                      <span className="text-red-500 text-xs">{err}</span>
                    )}
                  </ErrorMessage>
                </div>
                <button
                  disabled={!props.isValid || props.isSubmitting}
                  type="submit"
                  className={`btn ${
                    !props.isValid || props.isSubmitting
                      ? 'bg-primaryDisable'
                      : 'bg-primary'
                  } text-white`}
                >
                  {props.isSubmitting ? 'Please Wait' : 'Register'}
                </button>
              </Form>
            );
          }}
        </Formik>
        <p className="text-xs text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 underline">
            Login
          </Link>
        </p>
        <div className="text-lg mt-2 pl-3 text-center font-bold text-primary">
          LiveArticle
        </div>
      </div>
    </div>
  );
};

export default Register;
