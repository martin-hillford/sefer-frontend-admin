import { useGetAsync } from 'sefer-fetch';
import { useEffect, useState } from 'react';
import { ResponseError } from 'util/errors';

interface Channel {
    id: number
}

export default (userId : string | number | null | undefined) => {
  const [channel, setChannel] = useState<Channel | undefined | null>(undefined);
  const get = useGetAsync<Channel>();

  useEffect(() => {
    const fetch = async () => {
      if (!userId) return setChannel(null);
      const response = await get(`/users/${userId}/current-admin-channel`);
      if (response.ok) return setChannel(response.body);
      throw new ResponseError(response.code, 'Could not load the chat channels for the user');
    };
    fetch().then();
  }, [userId]);

  return channel;
};
