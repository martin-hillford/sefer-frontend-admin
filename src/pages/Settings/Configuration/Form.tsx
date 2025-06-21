import { DropDown, Header, Line, Property, SavedAlert, SavingAlert, Switch, TextField } from 'sefer/components';
import { Configuration } from 'types/data/settings/Configuration';
import { User } from 'types/data/users/User';
import { Colors } from 'sefer/types/Colors';
import { State } from 'types/ui/State';
import { DataContext } from 'sefer/types/DataContext';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { Actions } from './Actions';

export const Form = (props : { context : DataContext<Configuration>, admins : User[], state : State, save : () => void, onClosed : () => void }) => {
  const { context, admins, state, save, onClosed } = props;
  const terms = useLocalization(localization);
  const options = admins.map(a => ({ label: a.name, value: a.id }));

  return (
    <>
      <Header variant="large">{terms.settings}</Header>
      <br />
      <Header inline color={Colors.Blue} variant="large">{terms.settingsStatistics}</Header>
      <Property label={terms.activeStudentDays}>
        <TextField type="number" dataContext={context} name="studentActiveDays" />
      </Property>
      <Property label={terms.autoReminderDays}>
        <TextField type="number" dataContext={context} name="studentReminderDays" />
      </Property>
      <br />
      <Header inline color={Colors.Blue} variant="large">{terms.assignMentorsSettings}</Header>
      <Property label={terms.mentorRightsDays}>
        <TextField type="number" dataContext={context} name="sameMentorDays" />
      </Property>
      <Property label={terms.limitLessonSubmissions}>
        <Switch dataContext={context} name="isLessonSubmissionsLimited" />
      </Property>
      <Property label={terms.maxLessonsPerDay}>
        <TextField type="number" dataContext={context} name="maxLessonSubmissionsPerDay" />
      </Property>
      <Property label={terms.optimalAgeDifference}>
        <TextField type="number" dataContext={context} name="optimalAgeDifference" />
      </Property>
      <Property label={terms.availabilityWeighting}>
        <TextField type="number" dataContext={context} name="relativeAvailabilityFactor" />
      </Property>
      <Property label={terms.ageDifferenceWeighting}>
        {100 - context.data.relativeAvailabilityFactor}
      </Property>
      <Property label={terms.backupMentor}>
        <DropDown name="backupMentorId" dataContext={context} options={options} />
      </Property>
      <Line />
      <Actions save={save} />
      <SavingAlert show={state === State.Saving} content={terms.savingSettings} />
      <SavedAlert show={state === State.Saved} content={terms.savedSettings} onClosed={onClosed} />
    </>
  );
};
