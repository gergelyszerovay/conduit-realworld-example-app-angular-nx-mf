import { Pipe, PipeTransform } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { filter, fromEvent, map, merge, Observable, OperatorFunction, pipe, UnaryFunction } from "rxjs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createFormErrors$<T, F extends FormGroup>(formGroup: F, mapFn: (formGroup: F) => T): Observable<T> {
  return merge(
    fromEvent(document, 'focusout'),
    formGroup.valueChanges
  ).pipe(map(() => {
    formGroup.updateValueAndValidity({ emitEvent: false });
    return mapFn(formGroup);
    })
  );
}

export function filterUndefined<T>(): UnaryFunction<Observable<T | undefined>, Observable<T>> {
  return pipe(
    filter(x => x !== undefined) as OperatorFunction<T | undefined, T>
  );
}

@Pipe({ name: 'formErrorPipe', pure: true, standalone: true })
export class FormErrorPipe implements PipeTransform {
  transform(formError: unknown): string[] {
    if (!formError || typeof formError !== 'object') {
      return [];
    }
    const errors = Object.values(formError).filter(error => !!error);
    errors.sort();
    return errors;
  }
}
