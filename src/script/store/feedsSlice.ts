import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IGetWebDocumentsRequestDTO } from '../../public-common/interfaces/dto/web-document/iget-web-documents-request.interface';

const initialState: IGetWebDocumentsRequestDTO = {
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
  },
});

export const { setPageNumber, setPageSize } = feedsSlice.actions;
export default feedsSlice.reducer;
