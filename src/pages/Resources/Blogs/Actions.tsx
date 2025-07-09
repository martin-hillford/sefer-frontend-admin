import { Button, ButtonGroup } from 'sefer/components';
import { Pencil, Stats } from 'sefer/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Blog } from 'types/data/resources/Blog';
import { Dialogs } from './Dialogs';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useDeleteBlog } from './useDeleteBlog';
import { usePostBlogPublicationState } from './usePostBlogPublicationState';

export const Action = (props: { blog: Blog | undefined, refresh: () => void }) => {
  const { blog, refresh } = props;
  const navigate = useNavigate();
  const [state, setState] = useState('default');
  const terms = useLocalization(localization);
  const postDeleteBlog = useDeleteBlog();
  const postBlogPublicationState = usePostBlogPublicationState();

  if (!blog) return null;

  const edit = () => navigate(`/content/blogs/${blog.id}`);
  const takeOffline = () => setState('confirm-take-offline');
  const deleteBlog = () => setState('confirm-delete');
  const publish = () => setState('confirm-publish');
  const cancel = () => setState('default');

  const onDelete = async () => {
    setState('start-delete');
    await postDeleteBlog(blog.id);
    setState('completed-delete');
  };

  const onTakeOffline = async () => {
    setState('start-take-offline');
    await postBlogPublicationState(blog.id,false);
    setState('completed-take-offline');
  };

  const onPublish = async () => {
    setState('start-publish');
    await postBlogPublicationState(blog.id,true);
    setState('completed-publish');
  };

  const onClosed = () => {
    setState('default');
    refresh();
  }

  const onViewStats = () => navigate(`/stats/blogs/${blog.id}`);
  
  return (
    <ButtonGroup $pull="right">
      <Button onClick={edit} icon={<Pencil size={13} />} />
      {blog.isPublished && <Button onClick={takeOffline} label={terms.takeOffline} />}
      {!blog.isPublished && <Button onClick={publish} label={terms.publish} />}
      <Button onClick={deleteBlog} variant="danger" label={terms.delete} />
      <Dialogs
        state={state}
        onCanceled={cancel}
        onDelete={onDelete}
        onTakeOffline={onTakeOffline}
        onClosed={onClosed}
        onPublish={onPublish}
      />
      <Button onClick={onViewStats} icon={<Stats size={18} />} />
    </ButtonGroup>
  );
};
