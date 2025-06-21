import { Response } from 'sefer-fetch';

export function promiseThenSet<T>(promise: Promise<Response<T>>, set: (data: T | null | undefined) => void) {
  promise.then(response => {
    if(response.ok) set(response.body);
    else set(null);
  })
}
