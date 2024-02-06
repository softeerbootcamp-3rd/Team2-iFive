import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// 페이지 만들 때 마다 주석 제거할 예정
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="onboarding" element={<Onboarding />}>
                    <Route index element={<OnboardingLogin />} />
                    <Route path="login" element={<OnboardingLogin />} />
                    <Route path="join" element={<OnboardingJoin />} />
                </Route>
                <Route path="menu" element={<Menu />} />
                <Route path="subscribe" element={<Subscribe />}>
                    <Route index element={<SubscribeDrivers />} />
                    <Route path="drivers" element={<SubscribeDrivers />}>
                        <Route path="/" element={<SubscribeDriversDetail />} />
                        <Route
                            path=":id"
                            element={<SubscribeDriversDetail />}
                        />
                    </Route>
                </Route>
                <Route path="kid" element={<Kid />} /> */}
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
