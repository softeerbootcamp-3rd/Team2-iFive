import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Subscribe from "./pages/Subscribe/Subscribe";
import SubscribeDrivers from "./pages/SubscribeDrivers";
import SubscribeDriverDetail from "./pages/SubscribeDriverDetail";
import Onboarding from "./pages/Onboarding/Onboarding";

// 페이지 만들 때 마다 주석 제거할 예정
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="onboarding" element={<Onboarding />} />
                {/* 
                    <Route index element={<OnboardingLogin />} />
                    <Route path="login" element={<Login />} />
                    <Route path="join" element={<Join />} />

                <Route path="menu" element={<Menu />} />*/}
                <Route path="subscribe" element={<Subscribe />}>
                    <Route path="drivers" element={<SubscribeDrivers />}>
                        <Route path=":id" element={<SubscribeDriverDetail />} />
                    </Route>
                </Route>
                {/*<Route path="kid" element={<Kid />} /> */}
                <Route path="map" element={<Map />} />
                {/* <Route path="feedback" element={<Feedback />} />
                <Route path="pickup">
                    <Route path="start" element={<PickupStart />} />
                    <Route path="end" element={<PickupEnd />} />
                </Route>
                <Route path="driver-profile" element={<DriverProfile />} />
                <Route path="call-list" element={<CallList />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
