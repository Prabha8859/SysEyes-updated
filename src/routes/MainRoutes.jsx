import React, { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicRouter from "../layouts/PublicRouter";
import AuthLayout from "../layouts/AuthLayout";

import ErrorPage from "../pages/ErrorPage";


const Home = lazy(() => import("../components/home/Home"));
const AboutUs = lazy(() => import("../pages/about/AboutUs"));
const Profile = lazy(() => import("../pages/profile/Profile"));
const ContactSection = lazy(() => import("../pages/contact/ContactSection"));
const LoginSection = lazy(() => import("../pages/login/LoginSection"));
const RegisterForm = lazy(() => import("../pages/register/RegisterForm"));
const MembershipPlans = lazy(() => import("../pages/pricing/MembershipPlan"));
const ProfilePage = lazy(() => import("../pages/profile/ProfilePage"));
const ChatInterface = lazy(() => import("../components/chats/ChatInterface"));
const PaymentPage = lazy(() => import("../pages/payment/PaymentPage"));
const EditProfile = lazy(() => import("../pages/profile/Editingprofile/EditPRofile"));
const NextStep = lazy(() => import("../pages/register/NextStep"));
const NotificationPage = lazy(() => import("../pages/notification/Notify"));
const UserPlan = lazy(() => import("../pages/UserPlan/UserPlans"));
const UserProfilePage = lazy(() => import("../pages/profile/UserProfile/UserProfilePage"));
const BlockPage = lazy(() => import("../pages/blockList/BlockList"))
const FavoritePage = lazy(() => import("../pages/userSidebar/FavoritesPage"))


// const ChatPage = lazy(() => import("../pages/profile/Chating/chatpage"));


const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRouter />,
    errorElement: <ErrorPage />, 
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <AboutUs /> },
      { path: "profile2", element: <Profile /> },
      { path: "contact", element: <ContactSection /> },
      { path: "pricing-plan", element: <MembershipPlans /> },
      { path: "profile", element: <ProfilePage /> },
       {path: "block-list", element: <BlockPage />},
      { path: "chat", element: <ChatInterface /> },
      { path: "my-plan", element: <UserPlan/> },
      { path: "payment", element: <PaymentPage /> },
      { path: "nextstep", element: <NextStep /> },
      { path: "edit-profile", element: <EditProfile /> },
      { path: "notifications", element: <NotificationPage /> },
       { path: "profile/:id", element: <UserProfilePage /> },
       { path: "favorites", element: <FavoritePage /> },

      
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <ErrorPage />, 
    children: [
      { path: "login", element: <LoginSection /> },
      { path: "register", element: <RegisterForm /> },
    ],
  },
]);


export default function MainRoutes() {
  return <RouterProvider router={router} />;
}
