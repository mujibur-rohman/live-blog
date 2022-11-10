import React, { useEffect, useState } from 'react';
import TextEditor from '../components/textEditor/TextEditor';
import { EditorState } from 'draft-js';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import Select from 'react-select';

import { useMutation, useSubscription } from '@apollo/client';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import SpinnerButton from '../components/app/SpinnerButton';
import Spinner from '../components/app/Spinner';
import { Helmet } from 'react-helmet';
import {
  ADD_CATEGORY,
  UPDATE_ARTICLE,
} from '../graphql/mutation/articleMutation';
import {
  ARTICLE_DETAIL,
  CATEGORIES,
} from '../graphql/subscription/articleSubscription';

const UpdateArticle = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const { data, loading } = useSubscription(ARTICLE_DETAIL, {
    variables: { id: id },
  });
  const [showInputCategory, setShowInputCategory] = useState(false);
  const navigate = useNavigate();
  const { data: categories } = useSubscription(CATEGORIES);
  const [inputCat, setInputCat] = useState('');
  const [addCategory, { loading: loadCategory }] = useMutation(ADD_CATEGORY);
  const [updateArticle] = useMutation(UPDATE_ARTICLE);
  useEffect(() => {
    if (loading === false && data) {
      setContent(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(data?.articles_by_pk.content)
          )
        )
      );
    }
  }, [loading, data]);

  const submitCat = (e) => {
    e.preventDefault();
    if (inputCat.trim()) {
      addCategory({
        variables: {
          name: inputCat,
        },
      });
      setInputCat('');
    }
  };

  const initialValues = {
    title: data?.articles_by_pk.title,
    content: data?.articles_by_pk.content,
    category: data?.articles_by_pk.category.id,
  };

  const validationSchema = yup.object({
    title: yup.string().required().trim(),
    content: yup.string().required(),
    category: yup.number().required(),
  });

  const onSubmit = async (values, props) => {
    if (values.content === '<p></p>\n') {
      props.setFieldValue('content', '');
    } else {
      await updateArticle({
        variables: {
          id: id,
          title: values.title,
          content: values.content,
          category_id: values.category,
        },
      });
      props.resetForm();
      props.setSubmitting(false);
      toast.success('Articel Updated', {
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
        navigate(-1);
      }, 3000);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>Update Article</title>
      </Helmet>
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
        <h2 className="text-lg font-bold">Update Article</h2>
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
            <Form className="flex flex-col gap-2 h-screen">
              <div className="flex flex-col gap-2">
                <label>
                  Title <span className="text-red-400">*</span>
                </label>
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
                <label>
                  Content <span className="text-red-400">*</span>
                </label>
                <TextEditor
                  handleChange={handleChangeContent}
                  content={content}
                />
                <ErrorMessage name="content">
                  {(err) => <span className="text-red-500 text-xs">{err}</span>}
                </ErrorMessage>
              </div>
              <div className="flex flex-col gap-2">
                <label>
                  Category <span className="text-red-400">*</span>
                </label>
                <Select
                  options={categories?.categories.map((cat) => {
                    return { value: cat.id, label: cat.name };
                  })}
                  onChange={(e) => {
                    props.setFieldValue('category', e.value);
                  }}
                  defaultValue={{
                    value: data?.articles_by_pk.category.name,
                    label: data?.articles_by_pk.category.name,
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
                      value={inputCat}
                      onChange={(e) => setInputCat(e.target.value)}
                    />
                    <button
                      onClick={submitCat}
                      type="button"
                      className="btn text-xs bg-primary text-white"
                    >
                      {loadCategory ? <SpinnerButton /> : 'Add'}
                    </button>
                  </div>
                )}
              </div>
              <button
                disabled={!props.isValid || props.isSubmitting || loading}
                type="submit"
                className={`btn ${
                  !props.isValid || props.isSubmitting
                    ? 'bg-primaryDisable'
                    : 'bg-primary'
                } text-white mt-6`}
              >
                {props.isSubmitting || loading ? 'Please Wait' : 'Publish'}
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default UpdateArticle;
