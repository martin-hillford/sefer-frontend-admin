import { Boolean, Level, Loading, Property, Stage } from 'sefer/components';
import { useAdminFrontendConfig } from 'hooks/useAdminFrontendConfig';
import styled from 'styled-components';
import { Course } from 'types/data/Course';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useSystemSettings } from 'hooks/useSystemSettings';

const CourseDisplay = ({ course } : { course : Course | undefined}) => {
  const config = useAdminFrontendConfig();
  const [ settings ] = useSystemSettings();
  const terms = useLocalization(localization);
  if (!course) return <Loading center />;

  const courseUrl = `${config?.publicSite}${course.permalink}`;
  return (
    <>
      <Property label={terms.stage}>
        <Stage stage={course.stage} withTooltip />
      </Property>
      <Property label={terms.name}>{course.name}</Property>
      <Property label={terms.author}>{course.author}</Property>
      <Property label={course.copyright}>{course.copyright}</Property>
      <Property label={terms.copyrightLogo}>
        <CopyrightLogo course={course} />
      </Property>
      <Property label={terms.webshopLink}>
        <WebshopLink course={course} />
      </Property>
      <Property label={terms.videoIntroduction}>
        <IntroductionLink course={course} />
      </Property>
      <Property label={terms.permalink}>
        <a target="_blank" rel="noreferrer" href={courseUrl}>{course.permalink}</a>
      </Property>
      <Property label={terms.description}>{course.description}</Property>
      <Property label={terms.citation}>{course.citation}</Property>
      <Property label={terms.level}>
        <Level value={course.level as string} />
      </Property>
      <Property label={terms.image}>
        { course.thumbnailImage && <Image src={course.thumbnailImage} alt={course.name} /> }
        { !course.thumbnailImage && '-' }
      </Property>
      <Property label={terms.maxLessonSubmissions}>
        {course.maxLessonSubmissionsPerDay ?? settings?.maxLessonSubmissionsPerDay ?? 1}
      </Property>
      <Property label={terms.isVideoCourse}><Boolean size={16} value={course.isVideoCourse} /></Property>
      <Property label={terms.private}><Boolean size={16} value={course.private} /></Property>
      <Property label={terms.showOnHomepage}><Boolean size={16} value={course.showOnHomepage} /></Property>
    </>
  );
};

const WebshopLink = (props : { course : Course}) => {
  const { course } = props;
  if (!course.hasWebshopLink) return null;
  return <a target="_blank" rel="noreferrer" href={course.webshopLink as string}>{course.webshopLink}</a>;
};

const IntroductionLink = (props : { course : Course}) => {
  const { course } = props;
  if (!course.introductionLink) return null;
  return <a target="_blank" rel="noreferrer" href={course.introductionLink as string}>{course.introductionLink}</a>;
};

const Image = styled.img`
    max-width:100%;
`;

const CopyrightLogo = (props : { course : Course}) => {
  const { course } = props;
  if (!course.copyrightLogo || course.copyrightLogo.trim() === '') return null;
  const style = { height: '40px', paddingTop: '4px', paddingBottom: '4px', };
  return <img style={style} alt="" src={course.copyrightLogo} />;
};

export default CourseDisplay;
