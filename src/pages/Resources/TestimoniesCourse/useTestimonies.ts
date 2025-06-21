import { useEffect, useState } from 'react';
import { Testimony } from 'types/data/resources/Testimony';
import { ResponseError } from 'util/errors';
import { useGetAsync } from 'sefer-fetch';

const useTestimonies = (courseId : number) : [Testimony[] | undefined, () => void, (value: Testimony[] | undefined) => void] => {
  const [data, setData] = useState<Testimony[] | undefined>();
  const get = useGetAsync<Testimony[]>();

  const refresh = async () => {
    setData(undefined);
    const { code, body } = await get(`/testimonies/course/${courseId}`);
    if (code !== 200) throw new ResponseError(code, 'Could not fetch the courses for the testimony.');
    setData(body);
  };

  useEffect(() => {
    refresh().then();
  }, [courseId]);

  return [data, refresh, setData];
};

export { useTestimonies };
