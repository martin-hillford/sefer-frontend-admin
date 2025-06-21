import { ButtonGroup, Line } from 'sefer/components';
import { Pencil, True } from 'sefer/icons';
import { SurveyResultView } from 'components';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SurveyResult } from 'types/data/enrollments/SurveyResult';
import { Colors } from 'sefer/types/Colors';

export const Result = (props : { result: SurveyResult, onProcessed : (r: SurveyResult) => void }) => {
  const { result, onProcessed } = props;
  const navigate = useNavigate();

  const onEditClick = () => {
    navigate(`/enrollments/create-testimony?result=${result.id}`);
  };

  const onProcessedClick = () => {
    onProcessed(result);
  };

  return (
    <>
      <SurveyResultView result={result} />
      <Line $margin={24} />
      <ButtonGroup $pull="right">
        {result.adminProcessed && <Processed><True size={25} /></Processed>}
        {!result.adminProcessed && <Button onClick={onProcessedClick}><True size={25} /></Button>}
        <Button onClick={onEditClick}><Pencil size={18} /></Button>
      </ButtonGroup>
      <br />
    </>
  );
};

const Button = styled.div`
    &:hover { color : ${Colors.Blue}};
    cursor: pointer;
    margin-left: 1px;
`;

const Processed = styled.div`
    color : ${Colors.Blue};
`;
