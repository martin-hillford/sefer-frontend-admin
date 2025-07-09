import { ButtonGroup, DropDown, Header, Property, SaveButton, TextField } from 'sefer/components';
import Gender from 'types/data/Gender';
import NotificationPreference from 'types/data/NotificationPreference';
import { Profile } from 'types/data/settings/Profile';
import { DataContext } from 'sefer/types/DataContext';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

const useGenders = () => {
  const terms = useLocalization(localization);
  return [
    { value: Gender.Male, label: terms.man },
    { value: Gender.Female, label: terms.woman },
  ];
}

const useNotificationsOptions = () => {
  const terms = useLocalization(localization);
  return [
    { value: NotificationPreference.DailyDigest, label: terms.daily },
    { value: NotificationPreference.WeeklyDigest, label: terms.weekly },
    { value: NotificationPreference.Direct, label: terms.direct },
    { value: NotificationPreference.None, label: terms.never },
  ];
}

export const Content = (props : { context : DataContext<Profile>, save : () => Promise<boolean> }) => {
  const { context, save } = props;
  const terms = useLocalization(localization);
  const genders = useGenders();
  const notificationsOptions = useNotificationsOptions();
  const onValidate = async () => context.validate();

  return (
    <>
      <Header variant="large">{terms.settings}</Header>
      <Property label={terms.emailAddress}>
        <TextField type="text" name="email" dataContext={context} />
      </Property>
      <Property label={terms.confirmation}>
        <TextField type="text" name="emailConfirm" dataContext={context} />
      </Property>
      <Property label={terms.name}>
        <TextField type="text" name="name" dataContext={context} />
      </Property>
      <Property label={terms.gender}>
        <DropDown options={genders} name="gender" dataContext={context} />
      </Property>
      <Property label={terms.yearOfBirth}>
        <TextField type="number" name="yearOfBirth" dataContext={context} />
      </Property>
      <Property label={terms.emailNotifications}>
        <DropDown options={notificationsOptions} name="notificationPreference" dataContext={context} />
      </Property>
      <br />
      <br />
      <p>{terms.passwordConfirmMessage}</p>
      <Property label={terms.password}>
        <TextField type="password" name="password" dataContext={context} />
      </Property>

      <ButtonGroup $pull="right">
        <SaveButton onSave={save} onValidate={onValidate} />
      </ButtonGroup>
    </>
  );
};
