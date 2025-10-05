import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Preloader from "../../pages/preloader/Preloader";
import "./SuspenseWrapper.css";

export default function SuspenseWrapper({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location]);

  return loading ? <Preloader /> : children;
}
