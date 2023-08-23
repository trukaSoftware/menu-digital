import axios, { AxiosPromise } from 'axios';

export const del = <T>(query: string): AxiosPromise<T> => axios.delete(query);
