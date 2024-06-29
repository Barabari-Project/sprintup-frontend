import "./App.scss";
import HomeLayout from "./components/Layouts/HomeLayout";
import ContactUs from "./pages/ContactUs/ContactUs";
import CourseDetails from "./pages/CourseDetails/CourseDetails";
import FAQs from "./pages/FAQs/FAQs";
import Home from "./pages/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OurValues from "./pages/OurValues/OurValues";
import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [initialLoader, setInitialLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => setInitialLoader(false), 2000);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/contact",
          element: <ContactUs />,
        },
        {
          path: "/faqs",
          element: <FAQs />,
        },
        {
          path: "/course-details",
          element: <CourseDetails />,
        },
        {
          path: "/values",
          element: <OurValues />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      {initialLoader ? (
        <img className="initialLoader" src="/assets/loader_compressed.gif" alt="loader" />
      ) : (
        <RouterProvider router={router} />
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={2500}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
