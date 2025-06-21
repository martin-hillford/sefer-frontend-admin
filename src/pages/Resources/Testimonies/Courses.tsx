import { Bold, Container, Header, ListGroupItem, ThreeColumns } from 'sefer/components';
import { MegaPhone } from 'sefer/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Course } from 'types/data/Course';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Courses = ({ courses } : {courses : Course[]}) => {
  const rows = getRows(courses);
  const terms = useLocalization(localization);

  return (
    <Container>
      <Header inline={false} variant="large">{terms.testimonials}</Header>
      <p>{terms.chooseCourseOrOverall}</p>
      <ThreeColumns.Row $condensed $withBottom>
        <Overall />
        {courses.length > 0 && <CourseItem course={courses[0]} />}
        {courses.length > 1 && <CourseItem course={courses[1]} />}
      </ThreeColumns.Row>
      {rows.map(row => (
        <ThreeColumns.Row key={row[0].id} $condensed $withBottom>
          <CourseItem course={row[0]} />
          {row.length > 1 && <CourseItem course={row[1]} />}
          {row.length > 2 && <CourseItem course={row[2]} />}
        </ThreeColumns.Row>
      ))}
    </Container>
  );
};

const Overall = () => {
  const navigate = useNavigate();
  const terms = useLocalization(localization);
  return (
    <ThreeColumns.Column>
      <Hover onClick={() => navigate('/content/testimonies/overall')}>
        <ListGroupItem>
          <MegaPhone size={13} />&nbsp;<Bold>{terms.generalTestimonials}</Bold>
        </ListGroupItem>
      </Hover>
    </ThreeColumns.Column>
  );
};

const CourseItem = ({ course }: {course : Course}) => {
  const navigate = useNavigate();
  if (!course) return null;
  return (
    <ThreeColumns.Column>
      <Hover onClick={() => navigate(`/content/testimonies/course/${course.id}`)}>
        <ListGroupItem><Bold>{course.name}</Bold></ListGroupItem>
      </Hover>
    </ThreeColumns.Column>
  );
};

const getRows = (courses : Course[]) => {
  if (courses.length < 3) return [];

  const rowCount = Math.ceil((courses.length - 2) / 3);
  const rows = new Array<Array<Course>>(rowCount);

  for (let index = 0; index < rowCount; index++) {
    const row = [courses[(index * 3) + 2], courses[(index * 3) + 3], courses[(index * 3) + 4]];
    rows.push(row);
  }

  return rows;
};

const Hover = styled.div`
    cursor: pointer;
    & div { cursor: pointer; }
`;
