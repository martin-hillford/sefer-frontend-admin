import { Button, ButtonGroup, Header, Line } from 'sefer/components';
import { Key } from './Key';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Completed = (props: { backup: string[] | undefined, onCompleted: () => void }) => {
  const { backup, onCompleted } = props;
  const terms = useLocalization(localization).completed;
  return (
    <>
      <Header>Beveiliging</Header>
      <p>{terms.twoFactorEnabled}</p>
      <p>{terms.emergencyCodesInfo}</p>
      {backup?.map(code => <div key={code}><Key value={code} tagged={false} /></div>)}
      <Line />
      <ButtonGroup $pull="right">
        <Button onClick={onCompleted} variant="primary">{terms.close}</Button>
      </ButtonGroup>
    </>
  );
}
