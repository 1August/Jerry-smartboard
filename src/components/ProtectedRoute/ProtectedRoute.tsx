import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppSelector.ts";
import { selectCurrentUser } from "@/store/auth/authSlice.ts";

export type ProtectedRouteProps = {
  redirectTo?: string;
};
export const ProtectedRoute = (props: ProtectedRouteProps) => {
  const user = useAppSelector(selectCurrentUser);
  const redirectTo = props.redirectTo ?? "/";
  return user ? <Outlet /> : <Navigate to={redirectTo} />;
};
