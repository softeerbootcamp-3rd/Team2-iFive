import { useCallback, useEffect, useReducer } from "react";

const actionType = {
    loading: "loading",
    error: "error",
    success: "success"
};

function reducer(action) {
    switch (action.type) {
        case "loading":
            return { loading: true, error: null, data: null };
        case "error":
            return { loading: false, error: action.error, data: null };
        case "success":
            return { loading: false, error: null, data: action.data };
        default:
            throw new Error(`해당하는 action type이 없습니다`);
            break;
    }
}

/**
 *
 * @param {string} query
 * @param {boolean} skip
 * @returns {[Object, function]}
 */
export function useFetchGet(query, skip = false) {
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        error: null,
        data: null
    });

    /**
     *
     * @param {AbortSignal} signal
     */
    const fetchData = useCallback(
        async (signal) => {
            dispatch({ type: actionType.loading });
            try {
                const response = sendAuthRequest(`${BASE_URL}/${query}`, {
                    signal
                });
                if (!response.ok) {
                    console.error("Failed to GET kid information");
                    throw new Error("Failed to GET kid information");
                }
                const data = await response.json();
                dispatch({ type: actionType.success, data });
            } catch (error) {
                dispatch({ type: actionType.error, error });
                console.log(error);
            }
        },
        [query]
    );

    useEffect(() => {
        if (skip) return;
        const controller = new AbortController();
        fetchData(controller.signal());
        return () => controller.abort();
    }, [fetchData]);

    return [state, fetchData];
}
