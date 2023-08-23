import { CircularProgress } from "@mui/material";
import React from "react";

export interface ManageLoadingProps<T> {
  loading: boolean;
  error: string | null;
  data: T | null;
  children: (data: T) => React.ReactNode;
}

const ManageLoading = function <T>({
  loading,
  error,
  data,
  children,
}: ManageLoadingProps<T>) {
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <p>Error loading content</p>;
  }
  if (data) {
    return <>{children(data)}</>;
  }
  return null;
};

export default ManageLoading;
