import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };
  const validationSchema = yup.object({
    email: yup.string().required().email().trim(),
    password: yup.string().required().trim().min(6),
  });

  const onSubmit = async (values) => {
    console.log(values);
  };
  return (
    <div className="bg-primary h-screen pt-10 pb-10">
      <div className="bg-white mt-16 flex flex-col gap-4 mx-auto w-2/3 md:w-1/2 lg:w-1/3 p-4 rounded-lg">
        <p className="text-2xl pl-3 font-bold text-primary text-center">
          Login
        </p>
        <Formik
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          initialValues={initialValues}
        >
          {(props) => {
            return (
              <Form className="flex flex-col gap-4">
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
                <button className="btn bg-primary text-white" type="submit">
                  Login
                </button>
              </Form>
            );
          }}
        </Formik>
        <p className="text-xs text-gray-500">
          Create your account{' '}
          <Link to="/register" className="text-blue-400 underline">
            click here
          </Link>
        </p>
        <div className="text-lg mt-2 pl-3 text-center font-bold text-primary">
          LiveArticle
        </div>
      </div>
    </div>
  );
};

export default Login;
