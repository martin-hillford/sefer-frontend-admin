import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Enrollments = React.lazy(() => import('../pages/Enrollments/Active'));
const Verify = React.lazy(() => import('../pages/Enrollments/Verify'));
const Feedback = React.lazy(() => import('../pages/Enrollments/Feedback'));
const CreateTestimony = React.lazy(() => import('../pages/Enrollments/CreateTestimony'));
const Create = React.lazy(() => import('../pages/Enrollments/Create'));

const Router = () => (
  <Suspense fallback={null}>
    <Routes>
      <Route path="verify" element={<Verify />} />
      <Route path="feedback" element={<Feedback />} />
      <Route path="create-testimony" element={<CreateTestimony />} />
      <Route path="create" element={<Create />} />
      <Route index element={<Enrollments />} />
    </Routes>
  </Suspense>

);

export default Router;
