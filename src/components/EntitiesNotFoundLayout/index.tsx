import { ReactNode } from 'react';
import { BreadCrumb } from 'sefer/components/BreadCrumbs';
import { EntitiesNotFound, JumbotronLayout } from 'sefer/components';


interface Props {
  header : string,
  content : string
  title : string,
  subTitle : string
  crumbs : BreadCrumb[],
  icon : ReactNode,
}

export const EntitiesNotFoundLayout = (props: Props) => (
  <JumbotronLayout {...props}>
    <EntitiesNotFound {...props} />
  </JumbotronLayout>
)
