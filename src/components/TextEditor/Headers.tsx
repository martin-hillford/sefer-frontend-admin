import styled from 'styled-components';

const H1 = styled.h1`
    margin:0;
`;

const H2 = styled.h2`
    margin:0;
`;

const H3 = styled.h3`
    margin:0;
`;

const H4 = styled.h4`
    margin:0;
`;

const H5 = styled.h5`
    margin:0;
`;

const H6 = styled.h6`
    margin:0;
`;

export const styles = [
  { label: <H1>kop 1</H1>, value: 1 },
  { label: <H2>kop 2</H2>, value: 2 },
  { label: <H3>kop 3</H3>, value: 3 },
  { label: <H4>kop 4</H4>, value: 4 },
  { label: <H5>kop 5</H5>, value: 5 },
  { label: <H6>kop 6</H6>, value: 6 },
];

const sharps = '######';

export const getHeader = (selection: string | undefined, header: number) => {
  if (!selection) return '';
  return `\n\n${sharps.substring(0, header)} ${selection}\n\n`;
};