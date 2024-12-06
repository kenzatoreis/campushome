import React from 'react';
import { Bed, Users, MapPin } from 'lucide-react';

interface DormCardProps {
  name: string;
  image: string;
  location: string;
  capacity: number;
  available: number;
  price: number;
}

export default function DormCard({ name, image, location, capacity, available, price }: DormCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-48">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-sm">
          {available} spots left
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        <div className="mt-2 flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <div className="flex items-center text-gray-600">
              <Bed className="h-4 w-4 mr-1" />
              <span className="text-sm">{capacity} beds</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="h-4 w-4 mr-1" />
              <span className="text-sm">{available}/{capacity}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-indigo-600">${price}/month</p>
          </div>
        </div>
        <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
          Apply Now
        </button>
      </div>
    </div>
  );
}