import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Courses = React.lazy(() => import('../pages/Education/Courses'));
const CourseEdit = React.lazy(() => import('../pages/Education/CourseEdit'));
const Prerequisites = React.lazy(() => import('../pages/Education/Prerequisites'));
const Mentors = React.lazy(() => import('../pages/Education/Mentors'));
const Revisions = React.lazy(() => import('../pages/Education/Revisions'));
const Revision = React.lazy(() => import('../pages/Education/Revision'));
const Survey = React.lazy(() => import('../pages/Education/Survey'));
const Questions = React.lazy(() => import('../pages/Education/Questions'));
const EditLesson = React.lazy(() => import('../pages/Education/Lesson/EditLesson'));
const NewLesson = React.lazy(() => import('../pages/Education/Lesson/NewLesson'));
const Dictionary = React.lazy(() => import('../pages/Education/Dictionary'));

const Router = () => (
  <Suspense fallback={null}>
    <Routes>
      <Route path="revision/:courseId" element={<Revision />} />
      <Route path="survey/:revisionId" element={<Survey />} />
      <Route path="dictionary/:revisionId" element={<Dictionary />} />
      <Route path="questions/:revisionId" element={<Questions />} />
      <Route path="prerequisites/:courseId" element={<Prerequisites />} />
      <Route path="revisions/:courseId" element={<Revisions />} />
      <Route path="mentors/:courseId" element={<Mentors />} />
      <Route path="edit/:courseId" element={<CourseEdit />} />
      <Route path="edit" element={<CourseEdit />} />
      <Route path="lesson/new/:courseId" element={<NewLesson />} />
      <Route path="lesson/:lessonId" element={<EditLesson />} />
      <Route index element={<Courses />} />
    </Routes>
  </Suspense>
);

export default Router;
