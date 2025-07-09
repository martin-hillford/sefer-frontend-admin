import { useEffect, useState } from 'react';
import { ErrorText } from 'sefer/components';
import { NumberInput } from './NumberInput';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

interface Props {
  validationError? :boolean,
  codeError? : boolean,
  onCodeChange : (code : string) => void,
  onPressEnter: () => void
}

export const TwoFactorAuth = (props : Props) => {
  const { onCodeChange, validationError, codeError, onPressEnter } = props;
  const [code, setCode] = useState<string[]>([' ', ' ', ' ', ' ', ' ', ' ']);
  const [focus, setFocus] = useState(0);
  const terms = useLocalization(localization);

  const onChange = (value : string, index : number) => {
    const updated = [...code];
    updated[index] = value;
    setCode(updated);
    if (value !== ' ') setFocus(index + 1);
    onCodeChange(updated.join(''));
  };

  useEffect(() => {
    const onKeyUp = (event: KeyboardEvent) => {
      if (focus === 6 && event.key === 'Enter') onPressEnter();
    };
    document.addEventListener('keyup', onKeyUp);
    return () => { document.removeEventListener('keyup', onKeyUp); };
  }, [onPressEnter, focus]);

  const onBackSpace = () => setFocus(f => Math.max(f - 1, 0));

  return (
    <div>
      { code.map((c, index) => (
        <NumberInput
          showErrors={validationError || codeError}
          char={c.trim()}
          key={index}
          index={index}
          focus={focus}
          value={code}
          onChange={onChange}
          onBackSpace={onBackSpace}
        />
      ))}
      { codeError && <><br /> <ErrorText></ErrorText>{terms.errorText}</>}
    </div>
  );
};
