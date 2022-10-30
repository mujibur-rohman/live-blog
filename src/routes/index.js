import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CategoryArticles from '../components/article/CategoryArticles';
import NewestArticles from '../components/article/NewestArticles';
import AddArticle from '../pages/AddArticle';
import ArticleDetail from '../pages/ArticleDetail';
import Articles from '../pages/Articles';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import PrivateRoute from './PrivateRoute';
import ProtectedRoute from './ProtectedRoute';

const SetupRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles" element={<Articles />}>
        <Route index element={<NewestArticles />} />
        <Route path=":category" element={<CategoryArticles />} />
      </Route>
      <Route path="/article/:id" element={<ArticleDetail />} />
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-article" element={<AddArticle />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default SetupRoute;
