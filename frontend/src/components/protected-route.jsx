import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const { pathname } = useLocation();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/?sign-in=true" />;
  }

  if (!user?.unsafeMetadata?.role && pathname !== "/intro") {
    return <Navigate to="/intro" />;
  }

  

  return children;
};

export default ProtectedRoute;
