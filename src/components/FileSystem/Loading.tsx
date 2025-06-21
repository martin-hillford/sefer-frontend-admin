import { Loading as Spinner } from 'sefer/components';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Directory } from 'types/data/Directory';

export const Loading = (props : { directory? : Directory; }) => {
  const { directory } = props;
  const [show, setShow] = useState(false);
  const [timer, setTimer] = useState< NodeJS.Timeout>();

  useEffect(() => {
    if (timer) clearTimeout(timer);
    setShow(false);
    setTimer(setTimeout(() => { setShow(true); }, 200));
  }, [directory]);

  if (directory || !show) return null;

  return (
    <Center>
      <Spinner variant="small" />
    </Center>
  );
};

const Center = styled.div`
    display:flex;
    flex: 1 1 100%;
    align-items: center;
    justify-content: center;
    height:100%
`;
