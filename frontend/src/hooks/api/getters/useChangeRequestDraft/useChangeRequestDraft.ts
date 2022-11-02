import useSWR from 'swr';
import { useMemo } from 'react';
import { formatApiPath } from 'utils/formatPath';
import handleErrorResponses from '../httpErrorResponseHandler';

interface IChange {
    id: number;
    action: string;
    payload: {
        enabled: boolean; // FIXME: add other action types
    };
    createdAt: Date;
    createdBy: {
        id: number;
        username?: any;
        imageUrl?: any;
    };
}

export interface IChangeRequestResponse {
    id: number;
    environment: string;
    state: string;
    project: string;
    createdBy: {
        id: number;
        username?: any;
        imageUrl?: any;
    };
    createdAt: Date;
    features: Array<{
        name: string;
        changes: IChange[];
    }>;
}

const fetcher = (path: string) => {
    return fetch(path)
        .then(handleErrorResponses('ChangeRequest'))
        .then(res => res.json());
};

export const useChangeRequestDraft = (project: string) => {
    const { data, error, mutate } = useSWR<IChangeRequestResponse[]>(
        formatApiPath(`api/admin/projects/${project}/change-requests/draft`),
        fetcher
    );

    return useMemo(
        () => ({
            draft: data,
            loading: !error && !data,
            refetch: () => mutate(),
            error,
        }),
        [data, error, mutate]
    );
};