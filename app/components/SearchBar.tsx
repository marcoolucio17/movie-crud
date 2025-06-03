import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SearchBar({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
}) {
  return (
    <div className="flex items-center w-full max-w-md px-4 py-2 border border-b-stone-800 rounded-full shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
      <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="Busca películas por nombre"
        className="w-full outline-none bg-transparent text-gray-800 placeholder-gray-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
