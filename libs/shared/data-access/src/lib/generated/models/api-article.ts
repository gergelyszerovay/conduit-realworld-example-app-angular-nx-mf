/* tslint:disable */
/* eslint-disable */
import { apiProfile } from './api-profile';
export interface apiArticle {
  author: apiProfile;
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: Array<string>;
  title: string;
  updatedAt: string;
}
