import { Lesson } from 'types/data/Lesson';
import { usePost, usePut } from 'sefer-fetch';
import { ResponseError } from 'util/errors';

export const useSaveLesson = () => {
  const update = useUpdate();
  const insert = useInsert();
  return (lesson : Lesson) => {
    if (lesson.id > 0) return update(lesson);
    return insert(lesson);
  }
};

const useInsert = () => {
  const post = usePost<string>();
  return async (lesson : Lesson) => {
    const { code, body } = await post('/courses/lessons', lesson);
    switch (code) {
      case 400: return null;
      case 200:
      case 202:
        const lessonId = parseInt(body ?? '');
        if (!body || lessonId === 0 || Number.isNaN(lessonId)) return null;
        lesson.id = lessonId;
        return lesson;
      default:
        throw new ResponseError(code, 'A fatal error occurred while saving the lesson of the course. Please contact the developer');
    }
  }
}

const useUpdate = () => {
  const put = usePut<number>();
  return async (lesson: Lesson) => {
    const { code } = await put(`/courses/lessons/${lesson.id}`, lesson);
    switch (code) {
      case 400: return null;
      case 202: return lesson;
      default:
        throw new ResponseError(code, 'A fatal error occurred while saving the lesson of the course. Please contact the developer');
    }
  }
}
