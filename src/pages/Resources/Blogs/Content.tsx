import { Bold, Button, DateLabel, EntitiesPanel, EntityForm } from 'sefer/components';
import { Stats } from 'sefer/icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Blog } from 'types/data/resources/Blog';
import { Action } from './Actions';
import { BlogDetails } from './BlogDetails';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Content = ({ blogs, refresh }: { blogs: Blog[], refresh: () => void }) => {
  const [selected, setSelected] = useState<Blog>();
  const terms = useLocalization(localization);
  const navigate = useNavigate();

  useEffect(() => {
      if(!blogs || !selected) return;
      const blog = blogs.find(b => b.id === selected.id);
      if(!blog) return;
      setSelected(blog);
  }, [ blogs ])

  const onRenderItem = (blog: Blog) => ({ label: blog.name, child: <BlogItem blog={blog} /> });

  const onAddBlog = () => navigate('/content/blogs/create');
  const buttons = <Action blog={selected} refresh={refresh} />;

  const onViewStats = () => navigate('/stats/blogs');
  const statsButton = <Button onClick={onViewStats} icon={<Stats size={18} />} />;


  return (
    <EntitiesPanel
      data={blogs}
      name="blogs"
      onAdd={onAddBlog}
      onRenderItem={onRenderItem}
      additionalButtons={statsButton}
      header={terms.blogs}
      onSelect={setSelected}
    >
      <EntityForm buttons={buttons}>
        <BlogDetails blog={selected} />
      </EntityForm>
    </EntitiesPanel>
  );
};

const BlogItem = (props : { blog: Blog }) => {
  const { blog } = props;
  const terms = useLocalization(localization);
  return (
    <>
      <Bold>{blog.name}</Bold><br />
      <Small>
        {terms.createdOn}:&nbsp;
        <Bold><DateLabel value={blog.creationDate} />&nbsp;</Bold>
        {terms.byAuthor}:&nbsp;
        <Bold>{blog.author.name}</Bold>
      </Small>
    </>
  );
}

const Small = styled.span`
    font-size: 10px;
`;
