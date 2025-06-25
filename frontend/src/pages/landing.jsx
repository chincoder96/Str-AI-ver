import React from "react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { SignedOut } from "@clerk/clerk-react";
import Loader from "../components/ui/loader";

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
        <section className="text-center">
          <h1 className="flex flex-col items-center justify-center font-extrabold text-4xl sm:text-6xl lg:text-8xl tracking-tighter py-4 text-gray-500">
            Level up your coding.
            <span className="flex items-center gap-2 sm:gap-6 text-gray-500">
              One problem at a time
            </span>
          </h1>
          <TypingAnimation>
            Practice with Purpose. Powered by AI
          </TypingAnimation>

          <div className="flex flex-row justify-center gap-3 mt-5">
            <SignedOut>
              <Button
                className="bg-blue-950 hover:bg-blue-800 text-white text-lg px-6 py-3 rounded-xl font-semibold"
                onClick={() => {
                  window.location.href =
                    "/sign-in?redirect_url=/auth-redirect?mode=login";
                }}
              >
                Log in
              </Button>
            </SignedOut>
            <SignedOut>
              <Button
                className="bg-blue-950 hover:bg-blue-800 text-white text-lg px-6 py-3 rounded-xl font-semibold"
                onClick={() => {
                  window.location.href =
                    "/sign-up?redirect_url=/auth-redirect?mode=signup";
                }}
              >
                Sign Up
              </Button>
            </SignedOut>
          </div>
        </section>
      </main>
    </>
  );
};

export default LandingPage;
