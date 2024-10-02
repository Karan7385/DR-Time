import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ formData, handleChange, cities }) => {
  return (
    <form className="max-w-screen-lg mx-auto flex gap-4" onSubmit={(e) => e.preventDefault()}>
      <select
        id="city-dropdown"
        name="city"
        onChange={handleChange}
        className="bg-white border border-gray-300 rounded-lg p-3 w-1/3 focus:ring focus:ring-blue-500"
      >
        <option value="">Choose a city</option>
        {cities.map((city, index) => (
          <option key={index} value={city}>{city}</option>
        ))}
      </select>

      <input
        type="text"
        name="search"
        placeholder="Search by doctor name or specialty..."
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-3 w-2/3 focus:ring focus:ring-blue-500"
        required
      />

      <button type="submit" className="bg-green-700 text-white px-5 py-3 rounded-lg hover:bg-green-800">
        <FaSearch className="inline-block mr-2" /> Search
      </button>
    </form>
  );
};

export default SearchBar;
