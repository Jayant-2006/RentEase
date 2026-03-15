import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  return (
    <div className="card hover:scale-105 transition-transform">
      {/* Image */}
      <div className="h-48 bg-gray-200 rounded-t-lg mb-4 overflow-hidden">
        {listing.images && listing.images.length > 0 ? (
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Content */}
      <div>
        <h3 className="text-xl font-bold mb-2 truncate">{listing.title}</h3>
        <p className="text-gray-600 mb-2 line-clamp-2">{listing.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-primary">${listing.rent}/mo</span>
          <span className="text-sm bg-secondary text-white px-3 py-1 rounded-full">
            {listing.propertyType}
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-3">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span>{listing.location}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>{listing.bedrooms} Bed</span>
          <span>{listing.bathrooms} Bath</span>
          <span className={`px-2 py-1 rounded ${
            listing.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {listing.status}
          </span>
        </div>

        {listing.compatibilityScore && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="font-medium">Compatibility</span>
              <span className="font-bold text-primary">{listing.compatibilityScore}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${listing.compatibilityScore}%` }}
              ></div>
            </div>
          </div>
        )}

        <Link
          to={`/listings/${listing._id}`}
          className="btn btn-primary w-full text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ListingCard;
