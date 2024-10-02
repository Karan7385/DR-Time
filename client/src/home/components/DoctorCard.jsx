import { Link } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-3">
      <Link to={`/doctor/${doctor.id}`} className="p-8 rounded-t-lg block">
        <img
          className="p-8 rounded-t-lg"
          src={doctor.profilePicture || "/images/default-doctor.png"}
          alt={doctor.name}
        />
      </Link>
      <div className="px-5 pb-5">
        <Link to={`/doctor/${doctor.id}`}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {doctor.name}
          </h5>
        </Link>
        <p className="mt-2 text-gray-500">{doctor.specialization}</p>
        <p className="mt-2 text-gray-500">{doctor.city}, {doctor.hospital}</p>
        <div className="flex items-center mt-2.5 mb-5">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < doctor.rating ? "text-yellow-300" : "text-gray-300"}`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">₹{doctor.fee}</span>
          <Link
            to={`/book/${doctor.id}`}
            className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
