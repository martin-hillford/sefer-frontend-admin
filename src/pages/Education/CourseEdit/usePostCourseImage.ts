import { usePostFormData } from 'sefer-fetch';

export const usePostCourseImage = () => {
  const post = usePostFormData();
  return async (courseId: number, name: string, file : File, onProgress?: (percentage: number) => void) => {
    const action = `/courses/${courseId}/files/${name}`;
    const formData = new FormData();

    formData.set('file', file);
    formData.set('path', 'course_covers');
    formData.set('name', name);
    formData.set('isPublic', 'true');

    return post(action, formData, onProgress, false);
  }
}
