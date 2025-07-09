import { Tag } from 'sefer/components';
import styled from 'styled-components';

export const Key = (props : { value : string, tagged? : boolean }) => {
  const { value, tagged } = props;
  const key = value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();

  if (tagged) return <Tag>{key}</Tag>;
  return <Mono>{key}</Mono>;
};

const Mono = styled.span`
  font-family: ui-monospace, 'Courier New', Courier, monospace;
  font-weight: bold;
  font-style: normal;
  font-size: 14px;
  color: #666666;
`;
