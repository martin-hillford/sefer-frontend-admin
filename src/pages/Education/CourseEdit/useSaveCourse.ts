import { Course } from 'types/data/Course';
import { useDeleteCourseImage } from './useDeleteCourseImage';
import { usePostCourseImage } from './usePostCourseImage';
import { useSaveCourseData } from './useSaveCourseData';

// define the number of images that a course has
const imageCount = 3;

export const useSaveCourse = () => {

  const saveCourseData = useSaveCourseData();
  const saveImage = useSaveCourseImage();

  return async (data : Course, setProgress : (percentage : number) => void, setState : (state : string) => void) => {
    // set the proces to saving and start the clock
    const start = Date.now();
    setState('save');

    // save the course itself - this does not include any images
    const courseId = await saveCourseData(data);
    setProgress(10);

    // Now save all the images
    await saveImage(setProgress, 9, courseId, data, 'headerImage');
    await saveImage(setProgress, 30, courseId, data, 'largeImage');
    await saveImage(setProgress, 74, courseId, data, 'thumbnailImage');

    // Ensure that the use sees at least for 2.5 seconds the waiting message
    const finished = Date.now();
    const wait = Math.max(1, 2000 - (finished - start));
    setTimeout(() => setState('saved'), wait);
  }
}


const useSaveCourseImage = () => {
  const postCourseImage = usePostCourseImage();
  const deleteImage = useDeleteCourseImage();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (setProgress : (percentage : number) => void, start : number, courseId : number, data : any, name : string) => {

    const onProgress = (uploadProgress : number) => {
      const progress = start + ((uploadProgress < 100 ? uploadProgress : 100) / imageCount);
      setProgress(progress);
    };

    if (data[`${name}Deleted`]) { await deleteImage(courseId, name); onProgress(100); }
    if (!data[`${name}File`]) return onProgress(100);

    return postCourseImage(courseId, name,  data[`${name}File`], onProgress);
  };
}
