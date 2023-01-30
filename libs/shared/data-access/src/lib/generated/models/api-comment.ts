/* tslint:disable */
/* eslint-disable */
import { apiProfile } from './api-profile';
export interface apiComment {
  author: apiProfile;
  body: string;
  createdAt: string;
  id: number;
  updatedAt: string;
}
