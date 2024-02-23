export const userType = {
    parent: 0,
    driver: 1
};

export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const DEFAULT_COORDS = { latitude: 0, longitude: 0 };

export const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL;

export const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export const PARENT_TOKEN = import.meta.env.VITE_PARENT_TOKEN;

export const SEARCH_PAGE = (function () {
    const WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const WEEK_MAP = {
        Sun: "일요일",
        Mon: "월요일",
        Tue: "화요일",
        Wed: "수요일",
        Thu: "목요일",
        Fri: "금요일",
        Sat: "토요일"
    };

    return {
        WEEK,
        WEEK_MAP
    };
})();

export const PICKUP_STATUS_MAP = {
    승인: "proceeding",
    픽업중: "proceeding",
    대기중: "pending",
    만료됨: "expired",
    취소됨: "canceled"
};
