import { File } from 'types/data/Directory';

export enum FileType {
    Other = 0,
    Image = 1,
    Video = 2,
    Pdf = 3,
}

export const getFileType = (file : File) => {
  if (file.contentType.startsWith('image')) return FileType.Image;
  if (file.contentType.includes('video')) return FileType.Video;

  if (file.contentType.includes('pdf')) return FileType.Pdf;
  if (file.extension.endsWith('pdf')) return FileType.Pdf;

  return FileType.Other;
};