import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISearchParameterDTO } from '../../public-common/interfaces/dto/common/isearch-parameter.interface';
import { UpworkFeedSearchBy } from '../../public-common/enums/upwork-feed/upwork-feed-search-by.enum';
import { IGetFeedsRequestDTO } from '../models';
import { UpworkFeedSortBy } from '../../public-common/enums/upwork-feed/upwork-feed-sort-by.enum';
import { SortDirection } from '../../public-common/enums/common/sort-direction.enum';

const initialState: IGetFeedsRequestDTO = {
  pageSize: 20,
  pageNumber: 1,
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    setPageNumber(state, action: PayloadAction<number>) {
      return { ...state, pageNumber: action.payload };
    },
    setPageSize(state, action: PayloadAction<number>) {
      return { ...state, pageSize: action.payload };
    },
    setSearchParam(state, action: PayloadAction<Required<ISearchParameterDTO<UpworkFeedSearchBy>>>) {
      if (!state.searchParameters) {
        return { ...state, pageNumber: 1, searchParameters: [action.payload] };
      }

      const { searchBy, searchQuery } = action.payload;

      const newSearchParameters = [...state.searchParameters].filter(
        (searchParam) => searchParam.searchBy !== searchBy
      );

      const isArr = Array.isArray(searchQuery);

      if ((!isArr && searchQuery) || (isArr && searchQuery.length)) {
        newSearchParameters.push(action.payload);
      }

      return { ...state, pageNumber: 1, searchParameters: newSearchParameters };
    },
    setSortBy(state, action: PayloadAction<UpworkFeedSortBy>) {
      return { ...state, sortBy: action.payload, sortDirection: SortDirection.ASC };
    },
    setSortDirection(state, action: PayloadAction<SortDirection>) {
      return { ...state, sortDirection: action.payload };
    },
    removeSort(state) {
      return { ...state, sortBy: undefined, sortDirection: undefined };
    },
  },
});

export const {
  setPageNumber,
  setPageSize,
  setSearchParam,
  setSortBy,
  setSortDirection,
  removeSort,
} = feedsSlice.actions;
export default feedsSlice.reducer;
