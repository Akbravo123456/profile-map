import axios from 'axios';

const API_URL = 'http://localhost:5000/profiles'; 

interface Profile {
  id: number;
  name: string;
  description: string;
  photo: string;
  lat: number;
  lng: number;
}

export const fetchProfiles = async (): Promise<{ data: Profile[] }> => {
  try {
    const response = await axios.get(API_URL);
    return response;
  } catch (error) {
    console.error('Error fetching profiles:', error);
    throw error;
  }
};

export const addProfile = async (newProfile: Omit<Profile, 'id'>): Promise<{ data: Profile }> => {
  try {
    const response = await axios.post(API_URL, newProfile);
    return response;
  } catch (error) {
    console.error('Error adding profile:', error);
    throw error;
  }
};

export const updateProfile = async (updatedProfile: Profile): Promise<{ data: Profile }> => {
  try {
    const response = await axios.put(`${API_URL}/${updatedProfile.id}`, updatedProfile);
    return response;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const deleteProfile = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw error;
  }
};
