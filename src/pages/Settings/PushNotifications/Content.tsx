import { Button, ButtonGroup, DropDown, Header, Line, TextField } from 'sefer/components';
import { useState } from 'react';
import { usePost } from 'sefer-fetch';
import { Response } from './Response';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Content = (props: { users: { id: number, name: string }[] }) => {
  const { users } = props;
  const [userId, setUserId] = useState<number | undefined>();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const options = users.map(u => ({ label: u.name, value: u.id }));
  const post = usePost<{ success: boolean, error?: string, exception?: object }>();
  const [response, setResponse] = useState<{ success: boolean, error?: string, exception?: object } | undefined>();
  const terms = useLocalization(localization);

  const send = async () => {
    const body = { title, content, userId };
    const value = await post('/admin/diagnostics/push-notifications', body);
    setResponse(value?.body);
  };

  if (response) return <Response back={() => setResponse(undefined)} response={response} />;
  return (
    <div style={{ flex: '1 1 auto' }}>
      <Header variant="large">{terms.sendNotification}</Header>
      <DropDown
        placeholder={terms.chooseUser}
        onChange={setUserId}
        value={userId}
        label={terms.user}
        name="user"
        options={options}
        searchable
      />
      <TextField
        label={terms.title}
        value={title}
        placeholder={terms.titlePlaceholder}
        onChange={setTitle}
        name="title"
        type="text"
      />
      <TextField
        label={terms.message}
        value={content}
        placeholder={terms.messagePlaceholder}
        onChange={setContent}
        name="content"
        type="text"
      />
      <Line />
      <ButtonGroup $pull="right">
        <Button onClick={send} label={terms.send} />
      </ButtonGroup>
    </div>
  );
};
