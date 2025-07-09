import { Course } from 'types/data/Course';
import { ResponseError } from 'util/errors';
import { Response, usePost, usePut } from 'sefer-fetch';

const imageKeys = [ "headerImage", "headerImageFile", "largeImage", "largeImageFile", "thumbnailImage", "thumbnailImageFile" ];

/** Returns the post-method for saving a course. it will return the id of saved course */
export const useSaveCourseData = () => {
  const post = usePost<{ id : number}>();
  const put = usePut<{ id : number}>();

  return (course: Course) => {
    const method = !course.id || course.id < 1 ? post : put;
    return saveCourseData(course, method);
  }
}

const saveCourseData = async (course: Course, method : (url: string, data: unknown) => Promise<Response<{ id : number}>>) => {
  const url = course.id < 1 ? '/courses' : `/courses/${course.id}`;

  // Image data should not be sent with course information itself
  const clone = cloneExcept(course, imageKeys);

  const { code, body } = await method(url, clone);

  switch (code) {
    case 201: return body!.id;
    case 202: return course.id;
    default:
      throw new ResponseError(code, 'A fatal error occurred while saving the course. Please contact the developer');
  }
};

function cloneExcept<S extends object,T>(data: S, except: string[]) {
  const cloned = {};
  Object.keys(data).forEach(key => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if(!except.includes(key)) (cloned as any)[key] = (data as any)[key];
  })
  return cloned as T;
}
