import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Overview = React.lazy(() => import('../pages/Series/Overview'));
const Add = React.lazy(() => import('../pages/Series/Details/Add'));
const Edit = React.lazy(() => import('../pages/Series/Details/Edit'));
const Courses = React.lazy(() => import('../pages/Series/Courses'));

const Router = () => (
  <Suspense fallback={null}>
    <Routes>
      <Route path=":id/courses" element={<Courses />} />
      <Route path="add" element={<Add />} />
      <Route path=":id" element={<Edit />} />
      <Route index element={<Overview />} />
    </Routes>
  </Suspense>

);

export default Router;
