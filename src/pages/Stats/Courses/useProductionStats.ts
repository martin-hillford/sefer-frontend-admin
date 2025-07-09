import { useEffect, useState } from 'react';
import { CourseProduction, CourseProductionExtended } from 'types/data/stats/CourseProduction';
import { useGetAsync } from 'sefer-fetch';


export const useProductionStats = (activeDays: number | null | undefined) => {
  const [stats, setStats] = useState<Array<CourseProductionExtended> | null>();
  const get = useGetAsync<CourseProduction[]>();

  useEffect(() => {
    if (!activeDays) return;
    const promise = get(`/stats/course-production?daysActive=${activeDays}`)
    promise.then(response => {
      if(response.ok && response.body) setStats(process(response.body));
      else if (response.ok) setStats(undefined);
      else setStats(null);
    })
  }, [ activeDays ]);

  return stats;
};

const process = (stats : Array<CourseProduction>) => stats
  .map(s => {
    const total = s.done + s.active + s.inActive + s.cancelled;
    const performance = total !== 0 ? (s.active + s.done) / total : 0;
    return { ...s, total, performance };
  });
