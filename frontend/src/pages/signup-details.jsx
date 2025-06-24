import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const SignUpDetails = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const insertUser = async () => {
      if (!user || !isLoaded) return;

      const { id, fullName, primaryEmailAddress } = user;

      const { error } = await supabase.from('users').insert([
        {
          id,
          name: fullName,
          email: primaryEmailAddress.emailAddress,
        },
      ]);

      if (error) {
        console.error("Insert failed:", error);
      } else {
        console.log("User inserted into Supabase");
        navigate('/intro');
      }
    };

    insertUser();
  }, [user, isLoaded, navigate]);

  return (
    <div className="flex justify-center items-center h-screen text-xl text-gray-700">
      Creating your account...
    </div>
  );
};

export default SignUpDetails;
