import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CategoryArticles from '../components/article/CategoryArticles';
import NewestArticles from '../components/article/NewestArticles';
import AddArticle from '../pages/AddArticle';
import ArticleDetail from '../pages/ArticleDetail';
import Articles from '../pages/Articles';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Author from '../pages/Author';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Search from '../pages/Search';
import UpdateArticle from '../pages/UpdateArticle';
import PrivateRoute from './PrivateRoute';
import ProtectedRoute from './ProtectedRoute';

const SetupRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/author/:id" element={<Author />} />
      <Route path="/articles" element={<Articles />}>
        <Route index element={<NewestArticles />} />
        <Route path=":category" element={<CategoryArticles />} />
      </Route>
      <Route path="/search/:input" element={<Search />} />
      <Route path="/article/:id" element={<ArticleDetail />} />
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-article" element={<AddArticle />} />
        <Route path="/update/:id" element={<UpdateArticle />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default SetupRoute;
