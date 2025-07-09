import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Dashboard = React.lazy(() => import('../pages/Dashboard/Dashboard'));
const Stats = React.lazy(() => import('../pages/Stats/Details'));
const MentorStats = React.lazy(() => import('../pages/Stats/MentorStats'));
const Blogs = React.lazy(() => import('../pages/Stats/Blogs'));
const Students = React.lazy(() => import('../pages/Stats/Students'));
const Courses = React.lazy(() => import('../pages/Stats/Courses'));
const Devices = React.lazy(() => import('../pages/Stats/Devices'));
const Performance = React.lazy(() => import('../pages/Stats/Performance'));

export default () => (
  <Suspense fallback={null}>
    <Routes>
      <Route path="details" element={<Stats />} />
      <Route path="mentors" element={<MentorStats />} />
      <Route path="blogs/:id" element={<Blogs />} />
      <Route path="blogs" element={<Blogs />} />
      <Route path="students" element={<Students />} />
      <Route path="courses" element={<Courses />} />
      <Route path="devices" element={<Devices />} />
      <Route path="performance" element={<Performance />} />
      <Route index element={<Dashboard />} />
    </Routes>
  </Suspense>
);
