import axios, { AxiosPromise } from 'axios';

export const getter = <T>(query: string): AxiosPromise<T> => axios.get(query);
