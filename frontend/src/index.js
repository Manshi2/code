import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactGA from './lib/google-analytics';
import TagManager from 'react-gtm-module'
import App from './App';
import Appointment from './pages/appointment';
import CallAppointment from './pages/call-appointment';
import Privacy from './pages/privacy';
import TermsandConditions from './pages/terms&conditions';
import Blog from './pages/blogs/index';
import Post from './pages/blogs/post';
import AllPosts from './pages/blogs/allposts';
import ReturnPolicy from './pages/returnpolicy';
import About from './pages/about'
import AdminLogin from './pages/admin/login';
import Dashboard from './pages/admin/dashboard';
import AdminAppointment from './pages/admin/dashboard/appointment';
import AdminContact from './pages/admin/dashboard/contact';
import AdminUsers from './pages/admin/dashboard/users';
import AdminUserProfile from './pages/admin/dashboard/userProfile';
import Prescription from './pages/admin/dashboard/prescription';

const tagManagerArgs = {
  gtmId: 'G-66EF3HLW06'
}

const RenderWithGA = ({Component}) => {
  const location  = useLocation()
  TagManager.initialize(tagManagerArgs)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname])

  ReactGA.pageview(location.pathname)
  return <Component />
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RenderWithGA Component={App} />} />
        <Route path="/appointment" element={<RenderWithGA Component={Appointment} />} />
        <Route path="/NTN60G8t4o08rbseH0TD" element={<RenderWithGA Component={CallAppointment} />} />
        <Route path="/blog" element={<RenderWithGA Component={Blog} />} />
        <Route path="/blog/post/all" element={<RenderWithGA Component={AllPosts} />} />
        <Route path="/blog/post/:slug" element={<RenderWithGA Component={Post} />} />
        <Route path="/privacy" element={<RenderWithGA Component={Privacy} />} />
        <Route path="/terms&conditions" element={<RenderWithGA Component={TermsandConditions} />} />
        <Route path="/returnpolicy" element={<RenderWithGA path='/' Component={ReturnPolicy} />} />
        <Route path="/about" element={<RenderWithGA  Component={About} />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/dashboard/appointment" element={<AdminAppointment />} />
        <Route path="/admin/dashboard/contact" element={<AdminContact />} />
        <Route path="/admin/dashboard/users" element={<AdminUsers />} />
        <Route path="/admin/dashboard/user/:phone" element={<AdminUserProfile />} />
        <Route path="/admin/dashboard/prescription" element={<Prescription />} />
      </Routes>
    </BrowserRouter>
    </>
  /* </React.StrictMode> */
);