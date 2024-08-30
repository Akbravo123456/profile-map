import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { loadProfiles, createProfile, editProfile, removeProfile } from '../store/profileSlice';

interface Profile {
  id: number;
  name: string;
  description: string;
  photo: string;
  lat: number;
  lng: number;
}

const AdminPanel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profiles, loading, error } = useSelector((state: RootState) => state.profiles);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [newProfile, setNewProfile] = useState<Profile>({
    id: 0,
    name: '',
    description: '',
    photo: '',
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    dispatch(loadProfiles());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewProfile({ ...newProfile, [e.target.name]: e.target.value });
  };

  const handleAddProfile = () => {
    dispatch(createProfile(newProfile));
    setNewProfile({ id: 0, name: '', description: '', photo: '', lat: 0, lng: 0 });
  };

  const handleEditProfile = (profile: Profile) => {
    setEditingProfile(profile);
  };

  const handleUpdateProfile = () => {
    if (editingProfile) {
      dispatch(editProfile(editingProfile));
      setEditingProfile(null);
    }
  };

  const handleDeleteProfile = (id: number) => {
    dispatch(removeProfile(id));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Panel</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add New Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newProfile.name}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newProfile.description}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            value={newProfile.photo}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
          />
          <input
            type="number"
            name="lat"
            placeholder="Latitude"
            value={newProfile.lat}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
          />
          <input
            type="number"
            name="lng"
            placeholder="Longitude"
            value={newProfile.lng}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
          />
        </div>
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={handleAddProfile}
        >
          Add Profile
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Manage Profiles</h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => (
              <tr key={profile.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{profile.name}</td>
                <td className="py-2 px-4 border-b">{profile.description}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="mr-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={() => handleEditProfile(profile)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={() => handleDeleteProfile(profile.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editingProfile && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Edit Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={editingProfile.name}
                onChange={(e) => setEditingProfile({ ...editingProfile, name: e.target.value })}
                className="p-2 border rounded-md"
              />
              <textarea
                name="description"
                value={editingProfile.description}
                onChange={(e) => setEditingProfile({ ...editingProfile, description: e.target.value })}
                className="p-2 border rounded-md"
              />
              <input
                type="text"
                name="photo"
                value={editingProfile.photo}
                onChange={(e) => setEditingProfile({ ...editingProfile, photo: e.target.value })}
                className="p-2 border rounded-md"
              />
              <input
                type="number"
                name="lat"
                value={editingProfile.lat}
                onChange={(e) => setEditingProfile({ ...editingProfile, lat: +e.target.value })}
                className="p-2 border rounded-md"
              />
              <input
                type="number"
                name="lng"
                value={editingProfile.lng}
                onChange={(e) => setEditingProfile({ ...editingProfile, lng: +e.target.value })}
                className="p-2 border rounded-md"
              />
            </div>
            <button
              className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              onClick={handleUpdateProfile}
            >
              Update Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
