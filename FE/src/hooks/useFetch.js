import { useCallback, useEffect, useReducer } from "react";
import { authRequest } from "@/service/authenticationAPI";
import { BASE_URL } from "@/constants/constants";

const actionType = {
    loading: "loading",
    error: "error",
    success: "success"
};

function reducer(state, action) {
    switch (action.type) {
        case actionType.loading:
            return { loading: true, error: null, data: null };
        case actionType.error:
            return { loading: false, error: action.error, data: null };
        case actionType.success:
            return { loading: false, error: null, data: action.data };
        default:
            throw new Error(`해당하는 action type이 없습니다. ${action.type}`);
    }
}

/**
 *
 * @param {string} query
 * @param {boolean} skip
 * @param {Object} options
 * @returns {[Object, function]}
 */
export function useFetch(query, options = {}, skip = false) {
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
                const response = await authRequest(`${BASE_URL}${query}`, {
                    signal,
                    ...options
                });
                if (!response.ok) {
                    console.error("Failed to GET kid information");
                    // throw new Error("Failed to GET kid information");
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
        fetchData(controller.signal);
        return () => controller.abort();
    }, [fetchData]);

    return {
        loading: state.loading,
        error: state.error,
        data: state.data,
        fetchData
    };
}
