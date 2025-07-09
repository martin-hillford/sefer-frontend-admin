import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Messaging = React.lazy(() => import('../pages/Messages'));

const Messages = () => (
  <Suspense fallback={null}>
    <Routes>
      <Route path=":userId" element={<Messaging />} />
      <Route index element={<Messaging />} />
    </Routes>
  </Suspense>

);

export default Messages;
