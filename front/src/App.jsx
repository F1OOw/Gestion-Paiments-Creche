import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protected_route";
import LoginPage from "./pages/login_page";
import LandingPage from "./pages/landing_page";
import ChildrenPage from "./pages/children_page";
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    // <p className="underline">
    //   AAAAAAAAAAAAA
    // </p>
    LoginPage()
      // <Router>
      //   <Routes>
      //     <Route path="/" element={<ProtectedRoute />}>
      //       <Route path="/" element={<LandingPage />} />
      //       {/* <Route path="/children" element={<ChildrenPage />} /> */}
      //     </Route>
      //     <Route path="/login" element={<LoginPage />} />
      //     {/* <Route path="*" element={<p>Not Found oops</p>} /> */}
      //   </Routes>
      // </Router>
  );
}

export default App;
