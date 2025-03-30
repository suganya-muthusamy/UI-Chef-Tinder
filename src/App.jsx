import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Body from "./components/Body";
import Signup from "./components/Signup";
import appStore from "./redux/appStore";
import { Provider } from "react-redux";
import Feed from "./components/Feed";
import Homepage from "./components/Homepage";
import Connections from "./components/Connections";
import ConnectionProfile from "./components/ConnectionProfile";
import ConnectionRequests from "./components/ConnectionRequests";
import RequestProfile from "./components/RequestProfile";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/profile/:userId" element={<ConnectionProfile />} />
            <Route path="/connection/:userId" element={<RequestProfile />} />
            <Route
              path="/connection-requests"
              element={<ConnectionRequests />}
            />
          </Route>
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
