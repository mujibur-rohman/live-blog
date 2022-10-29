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

const SetupRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles" element={<Articles />}>
        <Route index element={<NewestArticles />} />
        <Route path=":category" element={<CategoryArticles />} />
      </Route>
      <Route path="/add-article" element={<AddArticle />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/article/:id" element={<ArticleDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default SetupRoute;
