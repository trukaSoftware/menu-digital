import axios, { AxiosPromise } from 'axios';

export const put = <T, I>(query: string, payload: I): AxiosPromise<T> =>
  axios.put(query, payload);
