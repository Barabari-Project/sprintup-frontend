import "./App.scss";
import HomeLayout from "./components/Layouts/HomeLayout";
import ContactUs from "./pages/ContactUs/ContactUs";
import CourseDetails from "./pages/CourseDetails/CourseDetails";
import FAQs from "./pages/FAQs/FAQs";
import Home from "./pages/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OurValues from "./pages/OurValues/OurValues";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginLayout from "./components/Layouts/LoginLayout";
import Login from "./pages/Login/Login";
import DashboardLayout from "./components/Layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import CourseSyllabus from "./pages/CourseSyllabus/CourseSyllabus";
import axiosInstance from "./utils/axiosInstance";
import restEndPoints from "./data/restEndPoints.json";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./redux/slices/UserSliice";
import ProtectedRoute from "./utils/ProtectRoute";
import RestrictedRoute from "./utils/RestrictedRoute";
import Lottie from "react-lottie-player";
import loader from "./Lottie/loader.json";
import TermsofUse from "./pages/TermsofUse/TermsofUse";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

function App() {
  const dispatch = useDispatch();
  const [initialLoader, setInitialLoader] = useState(true);

  useEffect(() => {
    const auth = async () => {
      try {
        const response = await axiosInstance.get(`/${restEndPoints.auth}`);
        const studentDetails = response.data.student;
        dispatch(
          setUserDetails({
            enrolled: studentDetails.isEnrolled,
            phoneNumber: studentDetails.phoneNumber,
            name: studentDetails.name,
            progress: studentDetails.enrolled
              ? studentDetails.enrolled.progress
              : 0,
            avatar: studentDetails.avatar,
          })
        );
      } catch (error) {
        // console.log(error); // as we are going in production
      }
    };
    auth();
  }, []);

  useEffect(() => {
    setTimeout(() => setInitialLoader(false), 3000);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <ErrorPage />,
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
        {
          path: "/terms",
          element: <TermsofUse />,
        },
        {
          path: "/privacy-policy",
          element: <PrivacyPolicy />,
        },
      ],
    },
    {
      path: "/",
      element: <LoginLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/login",
          element: (
            <RestrictedRoute>
              <Login />
            </RestrictedRoute>
          ),
        },
        {
          path: "/signup",
          element: (
            <RestrictedRoute>
              <Login />
            </RestrictedRoute>
          ),
        },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "/course-syllabus/:id",
          element: (
            <ProtectedRoute>
              <CourseSyllabus />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <div className="App">
      {initialLoader ? (
        // <img
        //   className="initialLoader"
        //   src="/assets/loader_compressed.gif"
        //   alt="loader"
        // />
        <Lottie
          loop
          animationData={loader}
          play
          style={{ width: 300, height: 300 }}
        />
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
