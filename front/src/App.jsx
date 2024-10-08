import LoginPage from "./pages/login_page"
import ChildrenPage from './pages/children_page';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protected_route";
import LandingPage from "./pages/landing_page";
import SeasonPage from "./pages/season_page";
import EditSeason from "./pages/edit_season";
import ArchivePage from "./pages/archive_page";
import EditPayment from "./pages/edit_payement";
import Payment from "./pages/paiment";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { validateToken } from "./actions/user_actions";
import { useSelector } from "react-redux";
import Notification from "./components/notification_popup";



function App() {
  const dispatch = useDispatch();
  const {message,isError} = useSelector((state) => state.notification);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(validateToken(token));
    }
  }, [dispatch]);
  return(
    <div>
      {message && <Notification message={message} isError={isError} />}
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/children" element={<ChildrenPage />} />
            <Route path="/season" element={<SeasonPage />} />
            <Route path="/edit_season" element={<EditSeason />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/payments" element={<Payment />} />
            <Route path="/edit_payment/:id" element={<EditPayment />}/>
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<p>Not Found oops</p>} />
        </Routes>
      </Router>
    </div>
  ); 
}

export default App
