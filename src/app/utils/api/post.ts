import axios, { AxiosPromise } from 'axios';

export const post = <T, I>(query: string, payload: I): AxiosPromise<T> =>
  axios.post(query, payload);
