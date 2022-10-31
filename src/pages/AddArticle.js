import React, { useState } from 'react';
import TextEditor from '../components/textEditor/TextEditor';
import { EditorState } from 'draft-js';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import Select from 'react-select';
import { ADD_ARTICLE } from '../utility/constant';
import { useMutation } from '@apollo/client';
import useAuth from '../hooks/useAuth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddArticle = () => {
  const TextState = EditorState.createEmpty();
  const [content, setContent] = useState(TextState);
  const [showInputCategory, setShowInputCategory] = useState(false);
  const [addArticle] = useMutation(ADD_ARTICLE);
  const navigate = useNavigate();
  const { user } = useAuth();

  const initialValues = {
    title: '',
    content: '',
    category: '',
  };

  const validationSchema = yup.object({
    title: yup.string().required().trim(),
    content: yup.string().required().trim(),
    category: yup.string().required().trim(),
  });

  const onSubmit = async (values, props) => {
    if (values.content === '<p></p>\n') {
      console.log(true);
      props.setFieldValue('content', '');
    }

    await addArticle({
      variables: {
        title: values.title,
        content: values.content,
        category_id: values.category,
        userId: user.uid,
      },
    });
    props.resetForm();
    setContent(EditorState.createEmpty());
    props.setSubmitting(false);
    toast.success('Successful Article Added', {
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: 'dark',
    });
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const optionsCategory = [
    { value: 1, label: 'Olahraga' },
    { value: 2, label: 'Fashion' },
    { value: 3, label: 'Teknologi' },
    { value: 4, label: 'Travel' },
  ];

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="dark"
      />
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">New Article</h2>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props) => {
          const handleChangeContent = (body) => {
            setContent(body);
            props.setFieldValue(
              'content',
              draftToHtml(convertToRaw(content.getCurrentContent()))
            );
          };
          return (
            <Form className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <label>Title</label>
                <Field
                  type="text"
                  name="title"
                  placeholder="Title"
                  className={`input-text ${
                    props.errors.title && 'border-red-500'
                  }`}
                />
                {props.errors.title && (
                  <span className="text-red-500 text-xs">
                    {props.errors.title}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label>Content</label>
                <TextEditor
                  handleChange={handleChangeContent}
                  content={content}
                />
                <ErrorMessage name="content">
                  {(err) => <span className="text-red-500 text-xs">{err}</span>}
                </ErrorMessage>
              </div>
              <div className="flex flex-col gap-2">
                <label>Category</label>
                <Select
                  options={optionsCategory}
                  onChange={(e) => {
                    props.setFieldValue('category', e.value);
                  }}
                />
                <ErrorMessage name="category">
                  {(err) => <span className="text-red-500 text-xs">{err}</span>}
                </ErrorMessage>
                <span
                  onClick={() => setShowInputCategory(!showInputCategory)}
                  className="text-blue-500 underline text-xs cursor-pointer"
                >
                  {showInputCategory ? 'Cancel' : 'Add Category'}
                </span>
                {showInputCategory && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input-text"
                      placeholder="Category"
                    />
                    <button
                      type="button"
                      className="btn text-xs bg-primary text-white"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
              <button
                disabled={!props.isValid || props.isSubmitting}
                type="submit"
                className={`btn ${
                  !props.isValid || props.isSubmitting
                    ? 'bg-primaryDisable'
                    : 'bg-primary'
                } text-white mt-6`}
              >
                {props.isSubmitting ? 'Please Wait' : 'Publish'}
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default AddArticle;
