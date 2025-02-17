import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import EphanService from 'services/EphanService';

const initialState = {
  dancers: [],
  coaches: [],
  judges: [],
  clubs: [],
  dancerClasses: null,
  statuses: null,
  error: null,
  isLoading: false,
};

const createAsyncAction = (actionName, serviceMethod, transformPayload) => {
  return createAsyncThunk(actionName, async (_, { rejectWithValue }) => {
    const { result, error } = await serviceMethod();

    if (result?.records) {
      return transformPayload ? transformPayload(result.records) : result.records;
    }

    return rejectWithValue(error || 'An error occurred. Please try again later');
  });
};

const transformStatuses = (records) =>
  records.reduce((acc, status) => {
    acc[status.id] = status['Name'];
    return acc;
  }, {});

const transformDancers = (records) =>
  records
    .filter((dancer) => dancer['D Name'] !== null && dancer['D Surname'] !== null)
    .filter((judge) => judge['Status'])
    .map(({ 'D Name': name, 'D Surname': surname, 'Dancer Class': level, Status: status, ...rest }) => ({
      ...rest,
      name: name.trim(),
      surname: surname.trim(),
      level,
      status: status[0],
    }));

const transformJudges = (records) => records
    .filter((judge) => judge['Judges Verify'])
    .filter((judge) => judge['Status'])
    .map(({ 'Name Surname': fullName, 'Foto Judges': photo, Status: status, ...rest }) => ({
      ...rest,
      name: fullName.split(' ')[0].trim(),
      surname: fullName.split(' ')[1].trim(),
      photo,
      status: status[0],
    }));

const transformDancerClasses = (records) =>
  records.reduce((acc, dancerClass) => {
    acc[dancerClass.id] = dancerClass['Name'];
    return acc;
  }, {});

export const getDancers = createAsyncAction('dancers/getDancers', EphanService.getDancers, transformDancers);
export const getCoaches = createAsyncAction('coaches/getCoaches', EphanService.getCoaches);
export const getJudges = createAsyncAction('judges/getJudges', EphanService.getJudges, transformJudges);
export const getClubs = createAsyncAction('clubs/getClubs', EphanService.getClubs);
export const getDancerClasses = createAsyncAction(
  'dancerClasses/getDancerClasses',
  EphanService.getDancerClasses,
  transformDancerClasses
);
export const getStatuses = createAsyncAction('statuses/getStatuses', EphanService.getStatuses, transformStatuses);

const ephanSlice = createSlice({
  name: 'ephan',
  initialState,
  extraReducers: (builder) => {
    const actions = [getDancers, getCoaches, getJudges, getClubs, getDancerClasses, getStatuses];

    actions.forEach((action) => {
      builder
        .addCase(action.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(action.fulfilled, (state, { payload, type }) => {
          state.isLoading = false;
          state[type.split('/')[0]] = payload;
          state.error = null;
        })
        .addCase(action.rejected, (state, { payload, type }) => {
          state.isLoading = false;
          state[type.split('/')[0]] = [];
          state.error = payload;
        });
    });
  },
});

export default ephanSlice.reducer;
