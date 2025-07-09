import { Button, ButtonGroup } from 'sefer/components';
import { StyledContent } from '../StyledContent';
import { Windows } from 'sefer/icons';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FullScreen } from './FullScreen';

export const Preview = (props : { withPreview : boolean, content : string | undefined}) => {
  const [showContent, setShowContent] = useState(false);
  const { withPreview, content } = props;
  useEffect(() => setShowContent(false), [withPreview]);

  if (showContent) return <FullScreen onClose={() => setShowContent(false)} content={content} />;

  return (
    <Wrapper $withPreview={withPreview}>
      <Heading>
        <ButtonGroup $pull="right">
          <Button onClick={() => setShowContent(true)}><Windows size={20} /></Button>
        </ButtonGroup>
      </Heading>
      <Padding>
        {withPreview && <StyledContent content={content} />}
      </Padding>
    </Wrapper>
  );
};

const Heading = styled.div`
    padding:5px;
    background-color: #f5f5f5;
    height: 44px;
`;

const Wrapper = styled.div<{$withPreview : boolean}>`
    flex: 0 0 ${p => (p.$withPreview ? 50 : 0)}%;
    border: 1px solid #dddddd;
    background-color: white;
    margin-bottom: 15px;
    border-left-width: 0;
    display: ${p => (p.$withPreview ? 'auto' : 'none')};
`;

const Padding = styled.div`
    padding: 0 15px;
`;
