import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import EphanService from 'services/EphanService';

const initialState = {
  dancers: [],
  coaches: [],
  judges: [],
  clubs: [],
  dancerClasses: null,
  countries: null,
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
    .filter((dancer) => dancer['Status'])
    .map(
      ({
        'D Name': name,
        'D Surname': surname,
        'Dancer Class': level,
        'D Foto': photo,
        'Country Nationality': country,
        Status: status,
        ...rest
      }) => ({
        ...rest,
        name: name.trim(),
        surname: surname.trim(),
        photo,
        level,
        country,
        status: status[0],
      })
    );

const transformCoaches = (records) =>
  records
    .filter((coach) => coach['Coach Verify'])
    .filter((coach) => coach['Status'])
    .filter((coach) => coach['Coach Name'] !== null && coach['Coach Surname'] !== null)
    .map(
      ({
        'Coach Name': name,
        'Coach Surname': surname,
        'Country Work': country,
        'Foto Coach': photo,
        Status: status,
        ...rest
      }) => ({
        ...rest,
        name: name.trim(),
        surname: surname.trim(),
        status,
        country,
        photo,
      })
    );

const transformJudges = (records) =>
  records
    .filter((judge) => judge['Judges Verify'])
    .filter((judge) => judge['Status'])
    .map(
      ({
        'Name Surname': fullName,
        'Foto Judges': photo,
        'Country Nationality': country,
        Status: status,
        ...rest
      }) => ({
        ...rest,
        surname: fullName.split(' ')[0].trim(),
        name: fullName.split(' ')[1].trim(),
        photo,
        status: status[0],
        country,
      })
    );

const transformClubs = (records) =>
  records
    .filter((club) => club['Approve Club'])
    .filter((club) => club['Club Name'] !== null)
    .map(({ 'Club Name': name, 'Logo Club': photo, Country: country, ...rest }) => ({
      ...rest,
      name: name.trim(),
      photo,
      country,
    }));

const transformDancerClasses = (records) =>
  records.reduce((acc, dancerClass) => {
    acc[dancerClass.id] = dancerClass['Name'];
    return acc;
  }, {});

const transformCountries = (records) =>
  records.reduce((acc, country) => {
    acc[country.id] = country['Name'];
    return acc;
  }, {});

export const getDancers = createAsyncAction('dancers/getDancers', EphanService.getDancers, transformDancers);
export const getCoaches = createAsyncAction('coaches/getCoaches', EphanService.getCoaches, transformCoaches);
export const getJudges = createAsyncAction('judges/getJudges', EphanService.getJudges, transformJudges);
export const getClubs = createAsyncAction('clubs/getClubs', EphanService.getClubs, transformClubs);
export const getDancerClasses = createAsyncAction(
  'dancerClasses/getDancerClasses',
  EphanService.getDancerClasses,
  transformDancerClasses
);
export const getStatuses = createAsyncAction('statuses/getStatuses', EphanService.getStatuses, transformStatuses);
export const getCountries = createAsyncAction('countries/getCountries', EphanService.getCountries, transformCountries);

const ephanSlice = createSlice({
  name: 'ephan',
  initialState,
  extraReducers: (builder) => {
    const actions = [getDancers, getCoaches, getJudges, getClubs, getDancerClasses, getStatuses, getCountries];

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
