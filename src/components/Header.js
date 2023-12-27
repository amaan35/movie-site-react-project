import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AppState } from "../App";

const Header = () => {
  const useAppstate = useContext(AppState);

  return (
    <div className="top-0 sticky z-10 text-5xl flex font-bold border-b-4 border-b-white pb-4 pt-2 ps-3 justify-between items-center pr-3 bg-black">
      <Link to={"/"}>
        <span className="cursor-pointer">
          Movie<span className="text-red-600">Pro</span>
        </span>
      </Link>
      {
        useAppstate.login?<Link to={"/addmovie"}>
        <h1 className="text-xl flex items-center cursor-pointer pt-2">
          <Button>
            <AddIcon />
            Add movie
          </Button>
        </h1>
      </Link>:<Link to={"/login"}>
        <h1 className="text-lg bg-green-600 flex items-center cursor-pointer">
          <Button>
            <span className="text-white font-medium capitalize">
              Login
            </span>
          </Button>
        </h1>
      </Link>}
    </div>
  );
};

export default Header;
