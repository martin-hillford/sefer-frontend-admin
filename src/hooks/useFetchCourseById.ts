import { Course } from 'types/data/Course';
import { ResponseError } from 'util/errors';
import { useGetAsync } from 'sefer-fetch';
import { useEffect, useState } from 'react';

export const useFetchCourseById = (courseId : number | undefined | null) => {
  const [code, setCode] = useState<number | undefined>();
  const [course, setCourse] = useState<Course | undefined>();
  const get = useGetAsync<Course>()

  useEffect(() => {
    if(!courseId) return setCode(undefined);
    get(`/courses/${courseId}`).then(response => {
      setCode(response.code)
      setCourse(response.body);

    });
  }, [courseId]);


  if (!courseId) return null;
  if (!code) return undefined;
  if (course) course.isDeletable = course.stage === 'Edit' || course.stage === 'Test';

  switch (code) {
    case 200: return course;
    case 404: return null;
    default: throw new ResponseError(code, `Could not fetch course with id: ${courseId}`);
  }
}




