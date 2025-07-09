export type Directory = {
    name: string;
    path: string;
    directories? : Directory[];
    files? : File[];
}

export type File = {
    contentType: string,
    extension: string,
    name: string,
    path: string,
    size: number,
    url: string,
}