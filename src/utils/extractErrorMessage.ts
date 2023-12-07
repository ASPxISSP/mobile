import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const extractErrorMessage = (error: FetchBaseQueryError | SerializedError): string => {
    let errorMessage = '';

    if ('status' in error) {
        errorMessage = ('error' in error ? error.error : (error.data as { message: string }).message) || errorMessage;
    } else {
        errorMessage = error.message || errorMessage;
    }

    return errorMessage;
};
