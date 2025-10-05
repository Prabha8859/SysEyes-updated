import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-red-500">404 — Page Not Found</h1>
      <p className="text-lg text-gray-700 mt-2">
        Sorry, the page you are looking for does not exist.
      </p>
      <a href="/" className="mt-4 text-pink-500 hover:underline">
        Go back home
      </a>
    </div>
  );
}
