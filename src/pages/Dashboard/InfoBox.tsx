import { Loading } from 'sefer/components';
import { Info } from 'sefer/icons';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from 'sefer/types/Colors';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

interface InfoBoxProps {
    icon : ReactNode,
    value : number | undefined
    label : string,
    link : string,
    variant : Colors
}

export const InfoBox = (props : InfoBoxProps) => {
  const { link, variant } = props;
  const terms = useLocalization(localization);
  return (
    <Container>
      <ValueBox {...props} />
      <MoreInfo $color={variant}>
        <Info size={15} />
        <Link to={link}>{terms.moreInformation}</Link>
      </MoreInfo>
    </Container>
  );
};

const ValueBox = (props : InfoBoxProps) => {
  const { icon, value, label, variant } = props;
  const child = value !== undefined ? value : <Loading background={variant} color="white" />;
  return (
    <Display $color={variant}>
      <DisplayInfo>{icon}</DisplayInfo>
      <DisplayInfo><span>{child}</span></DisplayInfo>
      <Label>{label}</Label>
    </Display>
  );
};

const Container = styled.div`
    height: 142px;
    border: 1px solid rgba(0,0,0,0.1) ;
    background-color: #F5F5F5;
    margin-bottom: 23px;
    user-select: none;
`;

const Display = styled.div<{$color : string}>`
    height: 97px;
    background-color : ${p => p.$color};
    padding: 10px 15px;
    display: flex;
    flex-wrap: wrap;

    & > div {
        display: flex;
        align-items: flex-end;
        flex-direction: column;
        justify-items: center;
    }

    & > div:first-child {
        align-items: flex-start;
    }
`;

const DisplayInfo = styled.div`
    height: 60px;
    color: white;
    flex: 0 0 50%;
    font-size: 24px;
    padding-top: 14px;
`;

const Label = styled.div`
    color: white;
    flex: 0 0 100%;
    font-size: 13px;
`;

const MoreInfo = styled.div<{$color : string}>`
    height: 43px;
    line-height: 23px;
    color : ${p => p.$color};
    font-size: 13px;
    padding: 10px 15px;

    a {
        color : ${p => p.$color};
        text-decoration: none;
        padding-left: 6px;
    }
`;
