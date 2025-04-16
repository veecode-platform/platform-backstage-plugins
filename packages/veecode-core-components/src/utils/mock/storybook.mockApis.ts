import {
  AnyApiFactory,
  createApiFactory,
  errorApiRef,
  ErrorApi,
  ErrorApiError,
  ErrorApiErrorContext,
} from '@backstage/core-plugin-api';
import {
  translationApiRef,
  TranslationApi,
  TranslationRef,
  TranslationSnapshot,
  TranslationFunction,
} from '@backstage/core-plugin-api/alpha';
import { Observable } from '@backstage/types'; 
import { of, EMPTY } from 'rxjs';

// --------- Error API Mock ---------
const mockErrorApi: ErrorApi = {
  post(error: ErrorApiError, context?: ErrorApiErrorContext): void {
    console.error('[Storybook Mock] ErrorApi:', error, context);
  },
  error$(): Observable<{ error: ErrorApiError; context?: ErrorApiErrorContext }> {
    // Use 'as any' or a specific cast
    // return EMPTY as any;
    return EMPTY as any;
  },
};

// --------- Translation API Mock ---------
const createMockTranslationFunction = <
  TMessages extends { [key: string]: string }
>(): TranslationFunction<TMessages> =>
  (((key: any) => String(key)) as unknown) as TranslationFunction<TMessages>;

const mockTranslationApi: TranslationApi = {
  getTranslation<
    TMessages extends { [key: string]: string }
  >(_ref: TranslationRef<string, TMessages>): TranslationSnapshot<TMessages> {
    return {
      ready: true,
      t: createMockTranslationFunction<TMessages>(),
    };
  },
  translation$<
    TMessages extends { [key: string]: string }
  >(_ref: TranslationRef<string, TMessages>): Observable<TranslationSnapshot<TMessages>> {
    const snapshot: TranslationSnapshot<TMessages> = {
      ready: true,
      t: createMockTranslationFunction<TMessages>(),
    };
    // Use 'as any' or a specific cast
    // return of(snapshot) as any;
    return of(snapshot) as any;
  },
};

// --------- Exporting API Factories for ApiProvider ---------
export const storybookApis: AnyApiFactory[] = [
  createApiFactory({
    api: errorApiRef,
    deps: {},
    factory: () => mockErrorApi,
  }),
  createApiFactory({
    api: translationApiRef,
    deps: {},
    factory: () => mockTranslationApi,
  }),
];