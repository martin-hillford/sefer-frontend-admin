import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const Blogs = React.lazy(() => import('../pages/Resources/Blogs'));
const CreateBlog = React.lazy(() => import('../pages/Resources/Blog/CreateBlog'));
const EditBlog = React.lazy(() => import('../pages/Resources/Blog/EditBlog'));

const Pages = React.lazy(() => import('../pages/Resources/Pages'));
const CreatePage = React.lazy(() => import('../pages/Resources/Page/CreatePage'));
const EditPage = React.lazy(() => import('../pages/Resources/Page/EditPage'));

const EditTestimony = React.lazy(() => import('../pages/Resources/Testimony/EditTestimony'));
const CreateTestimony = React.lazy(() => import('../pages/Resources/Testimony/CreateTestimony'));
const Testimonies = React.lazy(() => import('../pages/Resources/Testimonies'));
const TestimoniesOverall = React.lazy(() => import('../pages/Resources/TestimoniesOverall'));
const TestimoniesCourse = React.lazy(() => import('../pages/Resources/TestimoniesCourse'));

const Templates = React.lazy(() => import('../pages/Resources/Templates'));
const EditTemplate = React.lazy(() => import('../pages/Resources/EditTemplate'));

const Router = () => (
  <Suspense fallback={null}>
    <Routes>
      <Route path="testimonies/overall" element={<TestimoniesOverall />} />
      <Route path="testimonies/course/:id" element={<TestimoniesCourse />} />
      <Route path="testimonies/create" element={<CreateTestimony />} />
      <Route path="testimonies/:id" element={<EditTestimony />} />
      <Route path="testimonies" element={<Testimonies />} />
      <Route path="blogs/create" element={<CreateBlog />} />
      <Route path="blogs/:id" element={<EditBlog />} />
      <Route path="blogs" element={<Blogs />} />
      <Route path="pages/create" element={<CreatePage />} />
      <Route path="pages/:id" element={<EditPage />} />
      <Route path="pages" element={<Pages />} />
      <Route path="templates" element={<Templates />} />
      <Route path="templates/edit" element={<EditTemplate />} />
      <Route path="*" element={<Navigate replace to="/dashboard" />} />
    </Routes>
  </Suspense>

);

export default Router;
