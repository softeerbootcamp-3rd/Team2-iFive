import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Map from "./pages/Map/Map";
import Home from "./pages/Home";
import Search from "./pages/Search/Search";
import Onboarding from "./pages/Onboarding/Onboarding";
import Login from "./pages/Login/Login";
import { Menu } from "./pages/menu/Menu";
import Publish from "./pages/Publish/Publish";
import DriverList from "./pages/DriverList/DriverList";

// 페이지 만들 때 마다 주석 제거할 예정
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="menu" element={<Menu />} />
                <Route path="onboarding" element={<Onboarding />} />
                <Route path="login" element={<Login />} />
                {/* <Route path="join" element={<Join />} /> */}
                <Route path="subscription/search" element={<Search />} />
                <Route path="subscription/drivers" element={<DriverList />} />
                {/* <Route
                    path="subscription/driver/:id"
                    element={<DriverDetail />}
                /> */}

                {/*<Route path="kid" element={<Kid />} /> */}
                <Route path="map" element={<Map />} />
                {/* <Route path="feedback" element={<Feedback />} />
                <Route path="pickup">
                    <Route path="start" element={<PickupStart />} />
                    <Route path="end" element={<PickupEnd />} />
                </Route>
                <Route path="driver-profile" element={<DriverProfile />} />
                <Route path="call-list" element={<CallList />} /> */}
                <Route path="publish" element={<Publish />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
