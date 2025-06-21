import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const Diagnostics = React.lazy(() => import('../pages/Settings/Diagnostics'));
const Configuration = React.lazy(() => import('../pages/Settings/Configuration'));
const Profile = React.lazy(() => import('../pages/Settings/Profile'));
const Password = React.lazy(() => import('../pages/Settings/Password/Index'));
const Security = React.lazy(() => import('../pages/Settings/Security'));
const Regions = React.lazy(() => import('../pages/Settings/Regions'));
const Logs = React.lazy(() => import('../pages/Settings/Logs/Index'));
const Sites = React.lazy(() => import('../pages/Settings/Sites'));
const PushNotifications = React.lazy(() => import('../pages/Settings/PushNotifications'));

const Router = () => (
  <Suspense fallback={null}>
    <Routes>
      <Route path="diagnostics/push-notifications" element={<PushNotifications />} />
      <Route path="diagnostics" element={<Diagnostics />} />
      <Route path="config" element={<Configuration />} />
      <Route path="profile" element={<Profile />} />
      <Route path="regions" element={<Regions />} />
      <Route path="sites" element={<Sites />} />
      <Route path="password" element={<Password />} />
      <Route path="security" element={<Security />} />
      <Route path="logs" element={<Logs />} />
      <Route path="*" element={<Navigate replace to="/settings/config" />} />
    </Routes>
  </Suspense>

);

export default Router;
