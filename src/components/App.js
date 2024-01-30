// import "../styles/App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Quora from "./quora/Quora";
import QuoraHeader from "./pages/quoraHeader/QuoraHeader";
import { AuthProvider } from "../provider/AuthProvider";
import AuthNavigator from "./navigator/AuthNavigator";
import Spaces from "./spaces/Spaces";
import Group from "./group/Group";
import QuoraSearchPage from "./pages/quoraSearchPage/QuoraSearchPage";
import Following from "./following/Following";
import Answer from "./answer/Answer";

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <AuthProvider>
        <AuthNavigator>
          <QuoraHeader />
        </AuthNavigator>
        <Routes>
          <Route
            path="/"
            element={
              <AuthNavigator>
                <Quora />
              </AuthNavigator>
            }
          ></Route>
          <Route
            path="/following"
            element={
              <AuthNavigator>
                <Following />
              </AuthNavigator>
            }
          ></Route>
          <Route
            path="/answer"
            element={
              <AuthNavigator>
                <Answer />
              </AuthNavigator>
            }
          ></Route>
          <Route
            path="/spaces"
            element={<AuthNavigator>{<Spaces />}</AuthNavigator>}
          ></Route>
          <Route
            path="/group"
            element={<AuthNavigator>{<Group />}</AuthNavigator>}
          ></Route>
          <Route
            path="/search"
            element={<AuthNavigator>{<QuoraSearchPage />}</AuthNavigator>}
          ></Route>
          <Route path={"/signin"} element={<Login />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
