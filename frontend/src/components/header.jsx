import React from "react";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignIn,
  useUser,
} from "@clerk/clerk-react";

const Header = () => {
  return (
    <div>
      <nav>
        <img src="/bg.png" className="h-13" />
        <div className="flex fixed right-2 top-4 gap-4 ">
        
        <SignedIn>
          <Link to={"/intro"} className="text-white font-extrabold">
          Home
        </Link>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              },
            }}
          ></UserButton>
        </SignedIn>
        </div>
      </nav>
    </div>
  );
};

export default Header;
