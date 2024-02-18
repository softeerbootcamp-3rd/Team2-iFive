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
            <Route path="onboarding" element={<Onboarding />} />
            <Route path="signup" element={<ParentSignUp />} />
            <Route path="login" element={<Login />} />
            <Route loader={checkAuthLoader}>
                <Route path="logout" loader={logoutAction} />
                {/* <Route path="/" element={<Menu />} /> */}
                <Route path="map" element={<Location />} />
                <Route path="subscription/search" element={<Search />} />
                <Route path="subscription/drivers" element={<DriverList />} />
                <Route
                    path="subscription/driver/:driverId"
                    loader={driverDetailLoader}
                    element={<DriverDetail />}
                />
                <Route path="pickup" element={<PickUpPage />} />
                <Route path="publish" element={<Publish />} />
            </Route>
        </Route>
    )
);

// 페이지 만들 때 마다 주석 제거할 예정
function App() {
    return <RouterProvider router={router} />;
}

export default App;
