import React from "react";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from "react-router-dom";
import Search from "./pages/Search/Search";
import Onboarding from "./pages/Onboarding/Onboarding";
import Login, { logout as logoutAction } from "./pages/Login/Login";
import { Menu } from "./pages/menu/Menu";
import Publish from "./pages/Publish/Publish";
import DriverList from "./pages/DriverList/DriverList";
import { checkAuthLoader } from "./utils/auth";
import { Location } from "./pages/Location/Location";
import { PickUpPage } from "./pages/PickUp/PickUp";
import DriverDetail, {
    loader as driverDetailLoader
} from "./pages/DriverDetail/DriverDetail";
import ParentSignUp from "./pages/SignUp/ParentSignUp";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Menu />} />
            <Route path="onboarding" element={<Onboarding />} />
            <Route path="/signup" element={<ParentSignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" loader={logoutAction} />
            {/* <Route path="join" element={<Join />} /> */}
            {/* 로그인 필요한 페이지 예시   <Route path="subscription/form" loader={checkAuthLoader} element={<Subscribe />} /> */}
            <Route path="subscription/search" element={<Search />} />
            <Route path="subscription/drivers" element={<DriverList />} />
            <Route
                path="subscription/driver/:driverId"
                loader={driverDetailLoader}
                element={<DriverDetail />}
            />

            {/*<Route path="kid" element={<Kid />} /> */}
            <Route path="map" element={<Location />} />
            {/* <Route path="feedback" element={<Feedback />} />
        <Route path="pickup">
            <Route path="start" element={<PickupStart />} />
            <Route path="end" element={<PickupEnd />} />
        </Route>
        <Route path="driver-profile" element={<DriverProfile />} />
        <Route path="call-list" element={<CallList />} /> */}
            <Route path="publish" element={<Publish />}></Route>
            <Route path="pickup" element={<PickUpPage />}></Route>
        </Route>
    )
);

// 페이지 만들 때 마다 주석 제거할 예정
function App() {
    return <RouterProvider router={router} />;
}

export default App;
