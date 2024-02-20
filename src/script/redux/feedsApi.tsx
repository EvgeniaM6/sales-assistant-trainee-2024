import { createApi } from '@reduxjs/toolkit/query/react';
import { REQUEST_METHODS } from '../constants';
import { baseQueryWithReauth } from './baseQueryWithReauth';
import { BaseRoutes } from '../../public-common/enums/routes/base-routes.enum';
import { UpworkFeedsRoutesEnum } from '../../public-common/enums/routes/upwork-feeds-routes.enum';
import { RequestGetFeeds, ResponseGetFeeds } from '../models';

export const feedsApi = createApi({
  reducerPath: 'feedsApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getFeeds: build.mutation<ResponseGetFeeds, RequestGetFeeds>({
      query: ({ accessToken, values }: RequestGetFeeds) => ({
        url: `${BaseRoutes.V1}/${UpworkFeedsRoutesEnum.BasePrefix}/${UpworkFeedsRoutesEnum.GetFeeds}`,
        method: REQUEST_METHODS.POST,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'accept': 'application/json',
          'Content-type': 'application/json',
        },
        body: values,
      }),
    }),
  }),
});

export const { useGetFeedsMutation } = feedsApi;
