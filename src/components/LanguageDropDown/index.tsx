import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { DropDown } from 'sefer/components';

export type AvailableLanguages = "nl" | "en";
const available = ["nl", "en"] as AvailableLanguages[];

interface Props {
  selected: AvailableLanguages,
  setSelected: (value: AvailableLanguages) => void
  name?: string
}

export const LanguageDropDown = (props: Props) => {
  const { selected, setSelected, name = "language" } = props;
  const terms = useLocalization(localization);
  const options = available.map(key => ({ value: key, label: terms[key] }));
  return <DropDown name={name} options={options} value={selected} onChange={setSelected} />;
}
