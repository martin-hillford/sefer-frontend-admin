import { useLocation, useParams as useRouterParams } from 'react-router-dom';

export const useQueryString = (func? : (v: string) => number) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const values = {} as { [key: string]: number | string | undefined };
  params.forEach((value, key) => {
    if (value === undefined) values[key] = undefined;
    else if (func) values[key] = func(value);
    else values[key] = value;
  });
  return values;
};

export const useUrlParams = (func? : (v: string) => number) => {
  const params = useRouterParams();
  if (!func) return params;

  const values = {} as { [key: string]: number | string | undefined };
  for (const key in params) {
    if (params[key] === undefined) values[key] = undefined;
    else if (func) values[key] = func(params[key] as string);
    else values[key] = params[key];
  }

  return values;
};

export const useParams = (func? : (v: string) => number) =>
    ({ ...useQueryString(func), ...useUrlParams(func) });
