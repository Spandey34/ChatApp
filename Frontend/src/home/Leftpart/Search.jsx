import React from "react";
import { FaSearch } from "react-icons/fa"
import Menu from "../../components/Menu";

function Search() {
  return (
    <div className="px-6 py-4 h-[10vh]" >
      <form action="">
        <div className="flex justify-center items-center space-x-3">
            <label className="border-[1px] border-gray-700 bg-slate-900 rounded-lg p-2 flex items-center gap-2 w-[80%]">
            <input type="text" placeholder="Search" className="grow outline-none rounded-md bg-slate-800" />
        </label>
        <button>
            <FaSearch className="text-5xl p-2 hover:bg-gray-600 rounded-full duration-300" />
        </button>
        <Menu />
        </div>
        
      </form>
    </div>
  );
}

export default Search;
