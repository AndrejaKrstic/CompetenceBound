import React from "react";
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";

const PrivateRoute = ({ Component, isAuthenticated }) => {
  return isAuthenticated ? (
    <Layout>
      <Component />
    </Layout>
  ) : (
    <Navigate to="/connect" />
  );
};

export default PrivateRoute;
