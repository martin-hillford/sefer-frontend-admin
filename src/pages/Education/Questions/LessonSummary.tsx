import { Header, Jumbotron } from 'sefer/components';
import { ChevronDown, ChevronUp } from 'sefer/icons';
import { useState } from 'react';
import styled from 'styled-components';
import { Block } from './Block/Block';
import { Lesson } from 'types/data/RevisionSummary';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const LessonSummary = (props : { lesson: Lesson}) => {
  const [expended, setExpended] = useState(false);
  const terms = useLocalization(localization);
  const { lesson } = props;

  const switchExpended = () => setExpended(e => !e);
  return (
    <Jumbotron>
      <Wrapper $expended={expended}>
        <Header inline variant="small">{terms.lesson} {lesson.number}: {lesson.name}</Header>
        {expended && <div onClick={switchExpended}><ChevronUp size={24} /></div>}
        {!expended && <div onClick={switchExpended}><ChevronDown size={24} /></div>}
      </Wrapper>
      {expended && lesson.questions.map(q => <Block key={q.id} block={q} />)}
    </Jumbotron>
  );
};

const Wrapper = styled.div<{$expended: boolean}>`
    display: flex;
    padding-bottom: ${p => p.$expended ? 20: 0 }px;
    
    h4 { flex: 1 1 auto; }
    svg {
        margin-top: 10px;
        cursor: pointer;
    }
`;
