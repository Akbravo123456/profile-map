import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProfiles, addProfile, updateProfile, deleteProfile } from '../services/profileService';

interface Profile {
  id: number;
  name: string;
  description: string;
  photo: string;
  lat: number;
  lng: number;
}

interface ProfileState {
  profiles: Profile[];
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profiles: [],
  loading: false,
  error: null,
};

// Async Thunk to load profiles
export const loadProfiles = createAsyncThunk('profiles/loadProfiles', async () => {
  const response = await fetchProfiles();
  return response.data;
});

// Async Thunk to create a new profile
export const createProfile = createAsyncThunk('profiles/createProfile', async (newProfile: Omit<Profile, 'id'>) => {
  const response = await addProfile(newProfile);
  return response.data;
});

// Async Thunk to edit an existing profile
export const editProfile = createAsyncThunk('profiles/editProfile', async (updatedProfile: Profile) => {
  const response = await updateProfile(updatedProfile);
  return response.data;
});

// Async Thunk to remove a profile
export const removeProfile = createAsyncThunk('profiles/removeProfile', async (profileId: number) => {
  await deleteProfile(profileId);
  return profileId;
});

// Slice
const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Load profiles
      .addCase(loadProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProfiles.fulfilled, (state, action: PayloadAction<Profile[]>) => {
        state.loading = false;
        state.profiles = action.payload;
      })
      .addCase(loadProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch profiles';
      })

      // Create profile
      .addCase(createProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.loading = false;
        state.profiles.push(action.payload);
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create profile';
      })

      // Edit profile
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.loading = false;
        const index = state.profiles.findIndex((profile) => profile.id === action.payload.id);
        if (index !== -1) {
          state.profiles[index] = action.payload;
        }
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to edit profile';
      })

      // Remove profile
      .addCase(removeProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeProfile.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.profiles = state.profiles.filter((profile) => profile.id !== action.payload);
      })
      .addCase(removeProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete profile';
      });
  },
});

export default profileSlice.reducer;
