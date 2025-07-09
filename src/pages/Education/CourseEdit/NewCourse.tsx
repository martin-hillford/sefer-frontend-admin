import { Level } from 'types/data/Level';
import { Stage } from 'types/data/Stages';
import { CourseForm } from './CourseForm';

export const NewCourse = () => {
  const course = {
    author: '',
    copyright: '',
    copyrightLogo: '',
    description: '',
    hasWebshopLink: false,
    headerImage: '',
    id: 0,
    isVideoCourse: false,
    level: Level.Novice,
    name: '',
    permalink: '',
    private: false,
    showOnHomepage: false,
    stage: Stage.Edit,
    thumbnailImage: '',
    largeImage: '',
    webshopLink: null,
    isDeletable: true
  };

  return <CourseForm course={course} />;
};
