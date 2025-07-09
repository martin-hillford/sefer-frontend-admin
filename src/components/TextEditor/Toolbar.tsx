import { Button, ButtonGroup, DropDown } from 'sefer/components';
import * as util from '@martin-hillford/markdown-ts-react';
import * as Icons from 'sefer/icons';
import { useState } from 'react';
import { InsertFile, InsertHyperlink, InsertImage, InsertTable, InsertVideoLink } from './Dialogs';
import { getHeader, styles } from './Headers';

type ToolbarProps = {
    selection: string | undefined;
    onReplaceText : (text: string) => void;
    onInsertText : (text: string) => void;
    onPreview : () => void;
    withPreview : boolean
}

export const Toolbar = (props : ToolbarProps) => {
  const { selection, onReplaceText, onInsertText, onPreview, withPreview } = props;
  const [state, setState] = useState('normal');
  const noSelection = !selection || selection === '';

  const replace = (value? : string) => {
    if (selection && value) onReplaceText(value);
  };

  const bold = () => replace(`**${selection}**`);
  const italic = () => replace(`*${selection}*`);
  const onClose = () => { setState('normal'); };

  const onInsert = (value : string) => {
    if (!value) return setState('normal');

    if (selection) onReplaceText(value);
    else onInsertText(value);
    return setState('normal');
  };

  const isVideoUrl = (value : string) => {
    if (value.startsWith('https://')) return value;
    return undefined;
  };

  const isVimeoUrl = (value : string) => {
    if (util.isVimeoUrl(value)) return value.replace('/description', '');
    return undefined;
  };

  const insertList = () => {
    if (!selection) onInsertText('\n- \n- \n- \n');
  };

  const insertOrderedList = () => {
    if (!selection) onInsertText('\n1. \n2. \n3. \n');
  };

  const onStyled = (value: number) => replace(getHeader(selection, value));

  return (
    <ButtonGroup>
      <Button disabled={noSelection} onClick={bold}><Icons.Bold size={20} /></Button>
      <Button disabled={noSelection} onClick={italic}><Icons.Italic size={20} /></Button>
      <DropDown disabled={noSelection} name="header" options={styles} onChange={onStyled} />
      <Button onClick={() => { setState('link'); }}><Icons.Link size={20} /></Button>
      <Button disabled={!noSelection} onClick={insertList}><Icons.List size={20} /></Button>
      <Button disabled={!noSelection} onClick={insertOrderedList}><Icons.ListOrdered size={20} /></Button>
      <Button disabled={!noSelection} onClick={() => { setState('table'); }}><Icons.Table size={20} /></Button>
      <Button disabled={!noSelection} onClick={() => { setState('image'); }}><Icons.Image size={20} /></Button>
      <Button disabled={!noSelection} onClick={() => { setState('file'); }}><Icons.File size={20} /></Button>
      <Button disabled={!noSelection} onClick={() => { setState('youtube'); }}><Icons.YouTube size={20} /></Button>
      <Button disabled={!noSelection} onClick={() => { setState('vimeo'); }}><Icons.Vimeo size={20} /></Button>
      <Button disabled={!noSelection} onClick={() => { setState('video'); }}><Icons.Video size={20} /></Button>
      <Button active={withPreview} onClick={onPreview}><Icons.Preview size={20} /></Button>

      { state === 'link' && <InsertHyperlink selection={selection} onClose={onClose} onInsert={onInsert} /> }
      { state === 'image' && <InsertImage selection={selection} onClose={onClose} onInsert={onInsert} /> }
      { state === 'table' && <InsertTable onClose={onClose} onInsert={onInsert} /> }
      { state === 'video' && <InsertVideoLink onClose={onClose} selection={selection} onInsert={onInsert} type="Video" onValidate={isVideoUrl} /> }
      { state === 'youtube' && <InsertVideoLink onClose={onClose} selection={selection} onInsert={onInsert} type="Youtube" onValidate={util.getYouTubeUrl} /> }
      { state === 'vimeo' && <InsertVideoLink onClose={onClose} selection={selection} onInsert={onInsert} type="Vimeo" onValidate={isVimeoUrl} /> }
      { state === 'file' && <InsertFile onClose={onClose} onInsert={onInsert} /> }

    </ButtonGroup>
  );
};
