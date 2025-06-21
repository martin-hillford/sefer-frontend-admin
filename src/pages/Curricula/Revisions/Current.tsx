import { Bold, Boolean, Button, ButtonGroup, Header, Line, Property } from 'sefer/components';
import { ChevronLeft, Pencil } from 'sefer/icons';
import { useNavigate } from 'react-router-dom';
import { Close } from './Close';
import { Publish } from './Publish';
import { RevisionProps } from './RevisionProps';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Current = (props : RevisionProps) => {
  const { curriculum } = props;
  const navigate = useNavigate();
  const pubVersion = curriculum.publishedRevision?.version;
  const terms = useLocalization(localization);

  const onBack = () => navigate('/curricula');
  const onEdit = () => navigate(`/curricula/revision/${curriculum.id}`);

  return (
    <>
      <Header variant="large">{terms.currentRevisionHeader}</Header>
      <Property label={terms.dividedInYears}>
        <Boolean value={curriculum.editingRevision.useYears} size={16} />
      </Property>
      <Property label={terms.currentRevision}>
        <Bold>{terms.version} &nbsp;&nbsp; {curriculum.editingRevision.version}</Bold>
      </Property>
      <Property label={terms.publishedRevision}>
        { pubVersion && <Bold>{terms.version} &nbsp;&nbsp; {pubVersion}</Bold> }
        { !pubVersion && <Bold>{terms.notAvailable}</Bold> }
      </Property>
      <Line />
      <ButtonGroup $pull="right">
        <Button icon={<ChevronLeft size={23} />} onClick={onBack}>{terms.back}</Button>
        <Publish {...props} />
        <Close {...props} />
        <Button onClick={onEdit} icon={<Pencil size={20} />} />
      </ButtonGroup>
    </>
  );
};
