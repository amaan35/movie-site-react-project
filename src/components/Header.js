import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

const Header = () => {
  return (
    <div className="text-5xl flex font-bold border-b-4 border-b-white pb-4 pt-2 ps-3 justify-between items-center pr-3 bg-black">
      <span className='cursor-pointer'>
        Movie<span className="text-red-600">Pro</span>
      </span>
      <h1 className="text-xl flex items-center cursor-pointer pt-2">
        <Button>
          <AddIcon />
          Add movie
        </Button>
      </h1>
    </div>
  );
};

export default Header;
