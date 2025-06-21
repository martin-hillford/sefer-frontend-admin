import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const All = React.lazy(() => import('../pages/Users/Users'));
const Mentors = React.lazy(() => import('../pages/Users/Mentors'));
const Students = React.lazy(() => import('../pages/Users/Students'));
const Admins = React.lazy(() => import('../pages/Users/Admins'));
const Supervisors = React.lazy(() => import('../pages/Users/Supervisors'));
const MentorCourses = React.lazy(() => import('../pages/Users/MentorCourses'));
const MentorStudents = React.lazy(() => import('../pages/Users/MentorStudents'));
const StudentEnrollments = React.lazy(() => import('../pages/Users/StudentEnrollments'));
const Enrollment = React.lazy(() => import('../pages/Users/Enrollment'));
const MentorRegions = React.lazy(() => import('../pages/Users/MentorRegions'));

const Router = () => (
  <Suspense fallback={null}>
    <Routes>
      <Route path="mentors" element={<Mentors />} />
      <Route path="students" element={<Students />} />
      <Route path="administrators" element={<Admins />} />
      <Route path="supervisors" element={<Supervisors />} />
      <Route path="mentors/:id/courses" element={<MentorCourses />} />
      <Route path="mentors/:id/regions" element={<MentorRegions />} />
      <Route path="mentors/:id/students" element={<MentorStudents />} />
      <Route path="student/:id/enrollments" element={<StudentEnrollments />} />
      <Route path="student/enrollments/:id/lessons" element={<Enrollment />} />
      <Route index element={<All />} />
    </Routes>
  </Suspense>
);

export default Router;
