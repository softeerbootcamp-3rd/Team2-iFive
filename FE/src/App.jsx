import React from "react";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    useRouteLoaderData
} from "react-router-dom";
import Search from "./pages/Parents/Subscription/Search/Search";
import Onboarding, {
    loader as onboardingLoader
} from "./pages/Onboarding/Onboarding";
import Login, {
    loginLoader,
    logout as logoutLoader
} from "./pages/Auth/Login/Login";

import DriverList from "./pages/Parents/Subscription/DriverList/DriverList";
import { checkAuthLoader } from "./utils/auth";
import PickUpPage from "./pages/Driver/PickUp/PickUp";
import DriverDetail, {
    loader as driverDetailLoader
} from "./pages/Parents/Subscription/DriverDetail/DriverDetail";
import ParentSignUp from "./pages/Auth/SignUp/ParentSignUp";
import { DriverMenu, ParentMenu, fetchMenuData } from "./pages/Menu/Menu";
import SubscriptionConfirmation from "./pages/Complete/Confirmation/Confirmation";
import ParentMap from "./pages/Map/ParentMap";
import DriverMap, { fetchNowPickUpData } from "./pages/Map/DriverMap";
import EndPickUp from "./pages/Complete/EndPickUp/EndPickUp";
import ManagementSubscription, {
    fetchSubscribeList
} from "./pages/Driver/SubscriptionManagement/SubscriptionManagement";
import History, {
    loader as historyLoader
} from "./pages/Parents/History/History";
import SelectChild from "./pages/Driver/PickUp/SelectChild";

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
            <Route id="auth" loader={checkAuthLoader}>
                <Route path="logout" loader={logoutLoader} />
                <Route
                    path="map"
                    // TODO: Driver일 경우 loader로 비동기 처리
                    loader={fetchNowPickUpData}
                    element={
                        <RoleProvider>
                            {(isParent) =>
                                isParent ? <ParentMap /> : <DriverMap />
                            }
                        </RoleProvider>
                    }
                />
                <Route
                    path="menu"
                    loader={fetchMenuData}
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
                    path="history"
                    loader={historyLoader}
                    element={
                        <RoleProvider>
                            {(isParent) => isParent && <History />}
                        </RoleProvider>
                    }
                />
                <Route
                    path="select"
                    //loader={fetchPickUpList}
                    element={
                        <RoleProvider>
                            {(isParent) => !isParent && <SelectChild />}
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
                <Route
                    path="endpickup"
                    element={
                        <RoleProvider>
                            {(isParent) => !isParent && <EndPickUp />}
                        </RoleProvider>
                    }
                />

                <Route
                    path="pickup/request"
                    loader={fetchSubscribeList}
                    element={
                        <RoleProvider>
                            {(isParent) =>
                                !isParent && <ManagementSubscription />
                            }
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
