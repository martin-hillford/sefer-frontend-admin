import { useEffect, useState } from 'react';
import { CourseBase } from 'types/data/CourseBase';
import { Block } from 'types/data/curricula/Revision';
import { DataContext } from 'sefer/types/DataContext';
import { useFetchCourses } from 'hooks/useFetchCourses';
import { usePutCurriculumBlock } from './usePutCurriculumBlock';
import { usePostCurriculumBlock } from './usePostCurriculumBlock';
import { useFetchCurriculumBlock } from './useFetchCurriculumBlock';
import { useCreateDataContext } from './useCreateDataContext';
import { useFetchCurriculumRevision } from 'hooks/useFetchCurriculumRevision';

export const useBlock = (curriculumId: number, blockId?: number, year?: number) => {
  const [ curriculum ] = useFetchCurriculumRevision(curriculumId);
  const [block, setBlockDataContext] = useState<DataContext<Block> | undefined>();
  const putCurriculumBlock = usePutCurriculumBlock();
  const postCurriculumBlock = usePostCurriculumBlock();
  const createContext = useCreateDataContext();
  const { courses } = useFetchCourses();
  const getBlock = useGetBlock();

  useEffect(() => {
    if(!courses) return;

    const fetch = async () => {
      const result = await getBlock(courses, blockId, year);
      if (!result) return;
      const context = createContext(curriculumId, result)
      context.setListener(setBlockDataContext);
      setBlockDataContext(context);
    };

    fetch().then();

  }, [curriculumId, blockId, year, courses]);

  const save = async () => {
    if (!block?.data || !block?.data.courses) return false;
    const data = {
      id: block.data.id,
      name: block.data.name,
      description: block.data.description,
      curriculumId,
      courses: block.data.courses?.map(c => c.id),
      year: block.data.year,
    };
    if (!blockId) return postCurriculumBlock(data);
    return await putCurriculumBlock(data);
  };

  if (block) block.setListener(setBlockDataContext);
  const loaded = !!courses && !!curriculum && !!block;

  return { curriculum, block, courses, loaded, save };
};

const useGetBlock = () => {
  const fetchBlock = useFetchCurriculumBlock();
  return async (available: CourseBase[], blockId?: number, year?: number) => {
    if (!blockId) return createBlock(year, available);
    return fetchBlock(blockId);
  };
}

const createBlock = (year: number | undefined, available: CourseBase[]) => ({ year, sequenceId: 0, name: '', id: -1, courses: [], availableCourses: available });


