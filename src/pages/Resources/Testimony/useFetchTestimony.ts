import { useGet, useGetAsync } from 'sefer-fetch';
import { Testimony } from 'types/data/resources/Testimony';
import { useEffect, useState } from 'react';
import { Course } from 'types/data/Course';

export const useFetchTestimony = (testimonyId : number) => {
  const testimony = useGet<Testimony>(`/testimonies/${testimonyId}`);
  const [ course, setCourse ] = useState<Course | null | undefined>();
  const get = useGetAsync<Course>()

  useEffect(() => {
    if(!testimony) return;
    if(testimony.courseId === null) return setCourse(null);
    setCourse(undefined);
    const fetch = async () => {
      const response = await get(`/courses/${testimony.courseId}`);
      if (response.ok) return setCourse(response.body);
      throw new Error('Could not load the course for the testimony');
    };
    fetch().then();
  }, [ testimony ]);

  return { testimony, course };
}
