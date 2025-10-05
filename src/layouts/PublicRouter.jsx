import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
// import LottieAnimations from "../components/common/LottieAnimations";
import SuspenseWrapper from "../components/common/SuspenseWrapper";
import HeartsBackground from "../components/common/Hearts";

const PublicRouter = () => {
  const location = useLocation();
  const hideFooterRoutes = ["/chat", "/login", "/register", "/nextstep", "/payment"];
  const shouldHideLayout = hideFooterRoutes.includes(location.pathname);

  return (
    <>
      <HeartsBackground />
      {/* <LottieAnimations /> */}
      {!shouldHideLayout && <Header />}
      <SuspenseWrapper>
        <Outlet />
      </SuspenseWrapper>
      {!shouldHideLayout && <Footer />}
    </>
  );
};

export default PublicRouter;
