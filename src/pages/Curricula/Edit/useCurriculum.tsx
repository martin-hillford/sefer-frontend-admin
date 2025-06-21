import { useEffect, useState } from 'react';
import { CurriculumBase } from 'types/data/curricula/CurriculumBase';
import { DataContext } from 'sefer/types/DataContext';
import { useCreateDataContext } from './useCreateDataContext';
import { usePostCurriculum } from './usePostCurriculum';
import { usePutCurriculum } from './usePutCurriculum';

export const useCurriculum = (curriculum?: CurriculumBase) : [ DataContext<CurriculumBase> | undefined, (c: CurriculumBase) => Promise<boolean> ] => {
  const createContext = useCreateDataContext();
  const [context, setContext] = useState<DataContext<CurriculumBase> | undefined>();
  const postCurriculum = usePostCurriculum();
  const putCurriculum = usePutCurriculum();

  useEffect(() => {
    if (!curriculum) return;
    const context = createContext(curriculum);
    context.setListener(setContext);
    setContext(context);
  }, [ curriculum ]);

  const save = async (curriculum: CurriculumBase) => {
    if (curriculum.id < 0) return await postCurriculum(curriculum);
    return putCurriculum(curriculum);
  };

  return [context, save];
};
