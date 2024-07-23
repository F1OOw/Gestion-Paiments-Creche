import LoginPage from "./pages/login_page"
import ChildrenPage from './pages/children_page';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protected_route";
import LandingPage from "./pages/landing_page";
import SeasonPage from "./pages/season_page";
import EditSeason from "./pages/edit_season";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { validateToken } from "./actions/user_actions";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(validateToken(token));
    }
  }, [dispatch]);
  return(
    <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/children" element={<ChildrenPage />} />
            <Route path="/season" element={<SeasonPage />} />
            <Route path="/edit_season" element={<EditSeason />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<p>Not Found oops</p>} />
        </Routes>
      </Router>
  ); 
}

export default App
