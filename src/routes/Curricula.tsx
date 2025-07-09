import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Curricula = React.lazy(() => import('../pages/Curricula/Overview'));
const Edit = React.lazy(() => import('../pages/Curricula/Edit/Edit'));
const New = React.lazy(() => import('../pages/Curricula/Edit/New'));
const Revisions = React.lazy(() => import('../pages/Curricula/Revisions'));
const Revision = React.lazy(() => import('../pages/Curricula/Revision'));
const Years = React.lazy(() => import('../pages/Curricula/Years'));
const AddBlock = React.lazy(() => import('../pages/Curricula/Block/Add'));
const EditBlock = React.lazy(() => import('../pages/Curricula/Block/Edit'));

const Router = () => (
  <Suspense fallback={null}>
    <Routes>
      <Route path="edit/:id" element={<Edit />} />
      <Route path="revisions/:curriculumId/years/:year" element={<Years />} />
      <Route path="revisions/:curriculumId/blocks/add" element={<AddBlock />} />
      <Route path="revisions/:curriculumId/blocks/:blockId" element={<EditBlock />} />
      <Route path="revisions/:id" element={<Revisions />} />
      <Route path="revision/:id" element={<Revision />} />
      <Route path="new" element={<New />} />
      <Route index element={<Curricula />} />
    </Routes>
  </Suspense>

);

export default Router;
