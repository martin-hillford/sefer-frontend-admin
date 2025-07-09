import { Bold, Boolean, ButtonGroup, DateTimeLabel, Line, Property } from 'sefer/components';
import { Pencil } from 'sefer/icons';
import { useNavigate } from 'react-router-dom';
import { Testimony } from 'types/data/resources/Testimony';
import { Button } from './Button';
import { DeleteButton } from './DeleteButton';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Card = (props : { testimony : Testimony, refresh : () => void }) => {
  const { testimony, refresh } = props;
  const navigate = useNavigate();
  const onAdd = () => navigate(`/content/testimonies/${testimony.id}`);
  const terms = useLocalization(localization);

  return (
    <>
      <Property label={terms.displayName}>{testimony.name}</Property>
      <Property label={terms.isAnonymous}>
        <Boolean size={16} value={testimony.isAnonymous} />
      </Property>
      <Property label={terms.creationDate}>
        <DateTimeLabel value={testimony.creationDate} />
      </Property>
      <Property label={terms.modificationDate}>
        <DateTimeLabel value={testimony.modificationDate} empty="-" />
      </Property>
      <Bold>{terms.content}</Bold><br />
      {testimony.content}
      <Line $margin={20} />
      <ButtonGroup $pull="right">
        <DeleteButton {...props} deleted={refresh} />
        <Button onClick={onAdd}><Pencil size={18} /></Button>
      </ButtonGroup>
    </>
  );
};
