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

      console.log("mode:", mode);
      console.log("userId:", userId);
      console.log("email:", email);
      console.log("name:", name);

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

          if (insertError) {
            console.error("Insert error:", insertError);
          } else {
            console.log(" User inserted into Supabase");
          }
        } else {
          console.log("User already exists in Supabase (signup)");
        }
        navigate("/intro");
      }

      if (mode === "login") {
        if (existingUser) {
          console.log(" User exists in Supabase (login)");
          navigate("/intro");
        } else {
          alert(" You haven't signed up yet.");
          window.Clerk.signOut(); 
          navigate("/");
        }
      }
    };

    handleAuth();
  }, [user, isLoaded, mode, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      Redirecting...
    </div>
  );
};

export default AuthRedirect;
