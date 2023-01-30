import { Pipe, PipeTransform } from "@angular/core";

export type HttpRequestErrors = Record<string, string[]>;

export type HttpRequestState =
  'EMPTY' |
  'LOADING' | 'LOADED' |
  'SAVIING' | 'SAVED' |
  { errors: HttpRequestErrors };

export function getHttpRequestStateError(httpRequestState: HttpRequestState): HttpRequestErrors | undefined {
  return (typeof(httpRequestState) === 'object' && httpRequestState?.errors) || undefined;
}

@Pipe({ name: 'httpRequestStateErrorPipe', pure: true, standalone: true })
export class HttpRequestStateErrorPipe implements PipeTransform {
  transform(httpRequestState: HttpRequestState | undefined): HttpRequestErrors | undefined {
    return httpRequestState ? (getHttpRequestStateError(httpRequestState) || undefined) : undefined;
  }
}

export const defaultHttpRequestErrorMessage = 'Cannot connect to the server';
export const defaultHttpRequestErrors = { _message: [defaultHttpRequestErrorMessage] }
