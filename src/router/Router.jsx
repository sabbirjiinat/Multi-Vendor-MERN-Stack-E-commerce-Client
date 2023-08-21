import { createBrowserRouter } from "react-router-dom";
import SingUpPage from "../pages/SignUpPage/SignUpPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import Main from "../layout/Main";
import HomePage from "../pages/HomePage/HomePage";
import Products from "../pages/Products/Products";
import BestSellingPage from "../pages/BestSellingPage/BestSellingPage";
import EventsPage from "../pages/EventsPage/EventsPage";
import FAQPages from "../pages/FAQPages/FAQPages";

const router = createBrowserRouter([
  {
    path: "/",
    Element: <Main />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/best-selling",
        element: <BestSellingPage />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/events",
        element: <EventsPage/>,
      },
      {
        path: "/faq",
        element: <FAQPages/>,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/sign-up",
        element: <SingUpPage />,
      },
    ],
  },
]);

export default router;
