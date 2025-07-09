import { useGet, usePost } from 'sefer-fetch';
import { CourseBase } from 'types/data/CourseBase';
import { SeriesWithCourse } from 'types/data/series/Series';
import { ResponseError } from 'util/errors';

export const useSeriesCourses = (seriesId: number) => {
  const series = useGet<SeriesWithCourse>(`/series/${seriesId}/courses`);
  const post = usePost();

  if (series === null) throw new ResponseError('Could not load the series from the server, please try again, if the problem persists please contact the developer.');

  const save = async (courses: CourseBase[]) => {
    const { code } = await post(`/series/${seriesId}/courses`, courses.map(c => c.id));
    if (code === 202) return true;
    throw new ResponseError(code, 'Could not save the courses of the series to the server, please try again, if the problem persists please contact the developer.');
  };

  return { series, save };
};
