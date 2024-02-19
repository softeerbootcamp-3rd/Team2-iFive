import React from "react";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    useRouteLoaderData
} from "react-router-dom";
import Search from "./pages/Search/Search";
import Onboarding, {
    loader as onboardingLoader
} from "./pages/Onboarding/Onboarding";
import Login, {
    loginLoader,
    logout as logoutLoader
} from "./pages/Login/Login";

import DriverList from "./pages/DriverList/DriverList";
import { checkAuthLoader } from "./utils/auth";
import { Location } from "./pages/Location/Location";
import { PickUpPage } from "./pages/PickUp/PickUp";
import DriverDetail, {
    loader as driverDetailLoader
} from "./pages/DriverDetail/DriverDetail";
import ParentSignUp from "./pages/SignUp/ParentSignUp";
import { DriverMenu, ParentMenu } from "./pages/Menu/Menu";
import SubscriptionConfirmation from "./pages/Confirmation/Confirmation";

export default function App() {
    return <RouterProvider router={router} />;
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route
                path="/"
                loader={onboardingLoader}
                element={<Onboarding />}
            />
            <Route path="signup" element={<ParentSignUp />} />
            <Route path="login" loader={loginLoader} element={<Login />} />
            <Route id="auth" loader={checkAuthLoader} errorElement={<Login />}>
                <Route path="logout" loader={logoutLoader} />
                <Route path="map" element={<Location />} />
                <Route
                    path="/"
                    element={
                        <RoleProvider>
                            {(isParent) =>
                                isParent ? <ParentMenu /> : <DriverMenu />
                            }
                        </RoleProvider>
                    }
                />
                <Route
                    path="subscription/search"
                    element={
                        <RoleProvider>
                            {(isParent) => isParent && <Search />}
                        </RoleProvider>
                    }
                />
                <Route
                    path="subscription/drivers"
                    element={
                        <RoleProvider>
                            {(isParent) => isParent && <DriverList />}
                        </RoleProvider>
                    }
                />
                <Route
                    path="subscription/driver/:driverId"
                    loader={driverDetailLoader}
                    element={
                        <RoleProvider>
                            {(isParent) => isParent && <DriverDetail />}
                        </RoleProvider>
                    }
                />
                <Route
                    path="subscription/confirmation"
                    element={
                        <RoleProvider>
                            {(isParent) =>
                                isParent && <SubscriptionConfirmation />
                            }
                        </RoleProvider>
                    }
                />
                <Route
                    path="pickup"
                    element={
                        <RoleProvider>
                            {(isParent) => !isParent && <PickUpPage />}
                        </RoleProvider>
                    }
                />
            </Route>
        </>
    )
);

function RoleProvider({ children }) {
    const role = useRouteLoaderData("auth");
    return (
        <>
            {typeof children === "function"
                ? children(role === "PARENT")
                : children}
        </>
    );
}
