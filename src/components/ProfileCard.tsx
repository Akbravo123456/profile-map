import React from 'react';
import MapComponent from './MapComponent';

interface ProfileCardProps {
  id: number;
  name: string;
  description: string;
  photo: string;
  lat: number;
  lng: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ id, name, description, photo, lat, lng }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-6 transition-shadow duration-300 hover:shadow-xl">
      {/* Profile Image */}
      <img src={photo} alt={name} className="w-32 h-32 rounded-full mb-4 border-4 border-gray-200 shadow-md" />

      {/* Profile Name */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>

      {/* Profile Description */}
      <p className="text-gray-600 text-center mb-4">{description}</p>

      {/* Display MapComponent */}
      <div className="w-full h-48 rounded-lg overflow-hidden shadow-md border border-gray-200">
        <MapComponent lat={lat} lng={lng} />
      </div>
    </div>
  );
};

export default ProfileCard;
