import { Search } from "lucide-react";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="max-w-md mx-auto relative">
      
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-amber-500" />
      </div>

      <input
        type="search"
        placeholder="Search meals..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          block w-full py-1 pl-10 pr-4 mt-2 bg-amber-50 border border-amber-500 rounded-full text-gray-700 placeholder:text-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition
        "
      />
    </div>
  );
}