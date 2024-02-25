import { authRequest } from "./authenticationAPI";
import { BASE_URL } from "@/constants/constants";

export async function getKidInfo(parameter) {
    try {
        const response = await authRequest(`${BASE_URL}/${parameter}`);
        if (response.ok) {
            return await response.json();
        } else {
            console.error("Failed to GET kid information");
            return [];
        }
    } catch (error) {
        console.error(error);
        throw new Error("Faild to GET request");
    }
}

export async function postKidInfo(kidData) {
    try {
        const response = await authRequest(`${BASE_URL}/driver/pickup`, {
            method: "POST",
            body: kidData
        });
        if (response.ok) {
            return true;
        } else {
            const data = await response.json();
            // alert(`${data.message}\n${data.solution}`);
            alert(`현재 가능한 픽업이 아닙니다.`);
            return false;
        }
    } catch (error) {
        throw error;
    }
}
