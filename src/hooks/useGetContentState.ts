import { useGet } from 'sefer-fetch';
import { CourseContentState } from 'types/data/CourseContentState';

export const useGetContentState = (revisionId : number) =>
   useGet<CourseContentState>(`/courses/revision/${revisionId}/content-state`);
