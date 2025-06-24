import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

const AuthRedirect = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  useEffect(() => {
    const handleAuth = async () => {
      if (!user || !isLoaded || !mode) return;

      const userId = user.id;
      const email = user?.primaryEmailAddress?.emailAddress;
      const name = user?.fullName;

      const { data: existingUser, error } = await supabase
        .from("users")
        .select("id")
        .eq("id", userId)
        .single();

      if (mode === "signup") {
        if (!existingUser) {
          const { error: insertError } = await supabase.from("users").insert([
            {
              id: userId,
              email,
              name,
            },
          ]);
          navigate("/intro");
        } 
        else {
          alert("User already exists in Supabase. Please try again");
          window.Clerk.signOut(); 
          navigate("/");
        }
        
      }

      if (mode === "login") {
        if (existingUser) {
          navigate("/intro");
        } else {
          alert(" Account doesn't exist. Please SignUp first. ");
          window.Clerk.signOut(); 
          navigate("/");
        }
      }
    };

    handleAuth();
  }, [user, isLoaded, mode, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      Redirecting. Please wait...
    </div>
  );
};

export default AuthRedirect;
