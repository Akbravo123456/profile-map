import React, { useState } from 'react';
import ProfileCard from '../components/ProfileCard';

const mockProfiles = [
  {
    id: 1,
    name: 'John Doe',
    description: 'A software engineer with a passion for developing innovative programs.',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    lat: 40.712776,
    lng: -74.005974,
  },
  {
    id: 2,
    name: 'Jane Smith',
    description: 'A digital marketer with a knack for creating compelling content.',
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
    lat: 34.052235,
    lng: -118.243683,
  },
  {
    id: 3,
    name: 'Robert Johnson',
    description: 'An experienced data scientist who loves turning data into actionable insights.',
    photo: 'https://randomuser.me/api/portraits/men/3.jpg',
    lat: 37.774929,
    lng: -122.419418,
  },
  {
    id: 4,
    name: 'Emily Davis',
    description: 'A creative graphic designer with a flair for visual storytelling.',
    photo: 'https://randomuser.me/api/portraits/women/4.jpg',
    lat: 51.507351,
    lng: -0.127758,
  },
  {
    id: 5,
    name: 'Michael Brown',
    description: 'A front-end developer specializing in building user-friendly interfaces.',
    photo: 'https://randomuser.me/api/portraits/men/5.jpg',
    lat: 48.856613,
    lng: 2.352222,
  },
  {
    id: 6,
    name: 'Sophia Wilson',
    description: 'A business analyst with expertise in market research and data analysis.',
    photo: 'https://randomuser.me/api/portraits/women/6.jpg',
    lat: 41.878113,
    lng: -87.629799,
  },
];

const ProfileList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term

  // Filter profiles based on the search term
  const filteredProfiles = mockProfiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      {/* Search Input and Button */}
      <div className="mb-6 flex justify-center items-center">
        <input
          type="text"
          placeholder="Search by name"
          className="border border-gray-300 p-2 rounded-md shadow-sm mr-2 w-full sm:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setSearchTerm('')} 
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-2"
        >
          Clear
        </button>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProfiles.map((profile) => (
          <ProfileCard key={profile.id} {...profile} />
        ))}
      </div>
    </div>
  );
};

export default ProfileList;
