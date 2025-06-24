import React from 'react'
import {Button} from '@/components/ui/button';
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Intro from './intro'
import { TypingAnimation } from "@/components/magicui/typing-animation";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignIn,
  useUser,
  SignUp,
  useClerk
} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import {supabase} from "../supabaseClient";
import Loader from '../components/ui/loader'


const LandingPage = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [search, setSearch] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setShowSignUp(false);
      setSearch({});
    }
  };
    useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
      setShowSignUp(true);
    }
  }, [search]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  if (loading) return <Loader />;
 
  return (
    <>
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section className="text-center ">
        <h1 className="flex flex-col items-center justify-center  font-extrabold text-4xl sm:text-6xl lg:text-8xl tracking-tighter py-4 text-gray-500">
          Level up your coding.
          <span className="flex items-center gap-2 sm:gap-6 text-gray-500">
             One problem at a time
          </span>
        </h1>
        <TypingAnimation>Practice with Purpose. Powered by AI</TypingAnimation>
        <div className="flex flex-row justify-center gap-3 mt-5">
          <SignedOut >
              <Button className="bg-blue-950 hover:bg-blue-800 text-white text-lg px-6 py-3 rounded-xl font-semibold" onClick={() => setShowSignIn(true)}>Log in</Button>
          </SignedOut>
          <SignedOut >
              <Button className="bg-blue-950 hover:bg-blue-800 text-white text-lg px-6 py-3 rounded-xl font-semibold" onClick={() => setShowSignUp(true)}>Sign Up</Button>
          </SignedOut>
        </div>
      </section>
      </main>
      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/intro"
            fallbackRedirectUrl="/intro"
            afterSignInUrl="/intro"
          />
        </div>
      )}
        {showSignUp && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <SignUp
            signUpForceRedirectUrl="/intro"
            fallbackRedirectUrl="/intro"
            afterSignUpUrl="/intro"
          />
        </div>
      )}
      </>
  )
}

export default LandingPage