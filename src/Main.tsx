import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { UserContextProvider } from 'context/UserContext';
import Messages from 'routes/Messages';
import Courses from './routes/Courses';
import Curricula from './routes/Curricula';
import Enrollments from './routes/Enrollments';
import Resources from './routes/Resources';
import Series from './routes/Series';
import Settings from './routes/Settings';
import Stats from './routes/Stats';
import Users from './routes/Users';
import { getUserContext } from './util/userContext';
import clearUser from './util/clearUser';

const Files = React.lazy(() => import('./pages/Files/Index'));
const Logout = React.lazy(() => import('./pages/Support/Logout'));

export default () => {
  checkUser();

  return (
    <UserContextProvider>
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/users/*" element={<Users />} />
            <Route path="/courses/*" element={<Courses />} />
            <Route path="/curricula/*" element={<Curricula />} />
            <Route path="/series/*" element={<Series />} />
            <Route path="/dashboard/*" element={<Stats />} />
            <Route path="/stats/*" element={<Stats />} />
            <Route path="/enrollments/*" element={<Enrollments />} />
            <Route path="/files" element={<Files />} />
            <Route path="/resources/*" element={<Resources />} />
            <Route path="/content/*" element={<Resources />} />
            <Route path="/settings/*" element={<Settings />} />
            <Route path="/messages/*" element={<Messages />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </UserContextProvider>
  );
};

const checkUser = () => {
  if (!window.location.pathname.startsWith('/logon')) {
    const context = getUserContext();
    const role = context?.user?.role;
    if (role !== 'Admin' && role !== 'CourseMarker') {
      clearUser();
      window.location.assign('/logon');
    }
  }
};
