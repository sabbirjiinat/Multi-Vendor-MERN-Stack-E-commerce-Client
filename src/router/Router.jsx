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
        path: "/allProducts",
        element: <Products />,
      },
      {
        path: "/products",
        element: <CategoriesProducts/>,
      },
      {
        path: "/product/:id",
        element: <ProductDetailPage />,
        loader:({params})=>fetch(`https://multivendor-e-commerce-web-server.vercel.app/allProducts/${params.id}`)
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
        path: "/dashboard",
        element: <ShopDashboardPage />,
      },
      {
        path: "/dashboard-create-product",
        element: <ShopCreateProduct />,
      },
      /* todo */
      {
        path: "/shop/user",
        element: <ShopHomePage />,
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
  {
    path: "/dashboard-admin",
    element: <Layout />,
    children:[
      {
        path:'/dashboard-admin/home',
        element:<Dashboard/>,
      },
      {
        path:'/dashboard-admin/users',
        element:<AllUsers/>,
      }
    ]
  },
]);

export default router;
