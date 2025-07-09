import { useDelete, useGetAsync, usePost } from 'sefer-fetch';
import { Directory, File } from 'types/data/Directory';
import { ResponseError } from 'util/errors';

export const useAddDirectory = () => {
  const post = usePost<Directory>();
  return async (payload: { name: string, directory: Directory }) => {
    const data = { name: payload.name, path: payload.directory.path };
    const { code, body } = await post('/content/directories', data);
    switch (code) {
      case 201: return body as Directory;
      case 204: return null;
      default: throw new ResponseError(code, 'A fatal error occurred while creating the directory.');
    }
  }
}

export const useDeleteDirectory = () => {
  const del = useDelete<Directory>();
  return async (directory: Directory) => {
    if (!directory.path.endsWith('/')) directory.path += '/';
    const { code } = await del(`/content/directories/${directory.path}`, {});
    if (code !== 204) throw new ResponseError(code, 'A fatal error occurred while deleting the directory.');
  }
}

export const useDeleteFile = () => {
  const del = useDelete();
  return async (files : File[]) => {
    for (let index = 0; index < files.length; index++) {
      const { code } = await del(`/content/files/${files[index].path}`, {});
      if (code !== 204) throw new ResponseError(204, 'An error has occurred while deleting the file, please contact the developer.');
    }
  }
}

export const useFetchDirectory = () => {
  const get = useGetAsync<Directory>();
  return async (path : string) => {
    const { code, body } = await get(`/content/directories/${path}`);
    if (code !== 200) throw new ResponseError(code, 'Could not fetch the directory');
    return body;
  };
}
