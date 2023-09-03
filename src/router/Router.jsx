import { createBrowserRouter } from "react-router-dom";
import SingUpPage from "../pages/SignUpPage/SignUpPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import Main from "../layout/Main";
import HomePage from "../pages/HomePage/HomePage";
import Products from "../pages/Products/Products";
import BestSellingPage from "../pages/BestSellingPage/BestSellingPage";
import EventsPage from "../pages/EventsPage/EventsPage";
import FAQPages from "../pages/FAQPages/FAQPages";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import ShopCreatePage from "../pages/ShopCreatePage/ShopCreatePage";
import ShopDashboardPage from "../pages/Shop/ShopDashboardPage";
import ShopHomePage from "../pages/Shop/ShopHomePage";
import ShopCreateProduct from "../pages/Shop/ShopCreateProduct";
import AllUsers from "../pages/Admin/MainContent/AllUser/AllUsers";
import Layout from "../pages/Admin/Layout/Layout";
import Dashboard from "../pages/Admin/Dashboard";
import CategoriesProducts from "../pages/CategoriesProducts/CategoriesProducts";
import Checkout from "../pages/Checkout/Checkout";
import Inbox from '../pages/Inbox/Inbox'
import PendingProducts from '../pages/Admin/MainContent/PendingProducts/PendingProducts'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
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
        path: "/allProducts",
        element: <Products />,
      },
      {
        path: "/products",
        element: <CategoriesProducts />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailPage />,
        loader: ({ params }) =>
          fetch(
            `https://multivendor-e-commerce-web-server.vercel.app/allProducts/${params.id}`
          ),
      },
      {
        path: "/events",
        element: <EventsPage />,
      },
      {
        path: "/faq",
        element: <FAQPages />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/shop-create",
        element: <ShopCreatePage />,
      },
      {
        path: "/inbox",
        element: <Inbox />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
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
  /* Seller Dashboard */
  {
    path: "/dashboard-seller",
    element: <ShopDashboardPage />,
    children: [
      {
        path: "/dashboard-seller/create-product",
        element: <ShopCreateProduct />,
      },
    ],
  },
  /* Seller profile */
  {
    path: "/dashboard-seller/profile",
    element: <ShopHomePage />,
  },

  /* Admin dashboard */
  {
    path: "/dashboard-admin",
    element: <Layout />,
    children: [
      {
        path: "/dashboard-admin/home",
        element: <Dashboard />,
      },
      {
        path: "/dashboard-admin/users",
        element: <AllUsers />,
      },
      {
        path:'/dashboard-admin/pending-products',
        element:<PendingProducts/>
      }
    ],
  },
]);

export default router;
