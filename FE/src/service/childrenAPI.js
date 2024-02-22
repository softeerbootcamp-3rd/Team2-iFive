import { sendAuthRequest } from "./authenticationAPI";
import { BASE_URL } from "@/constants/constants";

export async function getKidInfo(parameter) {
    try {
        const response = await sendAuthRequest(`${BASE_URL}/${parameter}`);
        if (response.ok) {
            return await response.json();
        } else {
            console.error("Failed to GET kid information");
            throw new Error("Failed to GET kid information");
        }
    } catch (error) {
        console.error(error);
        throw new Error("Faild to GET request");
    }
}

export async function postKidInfo(kidData) {
    try {
        const response = await sendAuthRequest(`${BASE_URL}/driver/pickup`, {
            method: "POST",
            body: kidData
        });
        if (response.ok) {
            console.log("이미지 업로드 성공");
            return true;
        } else {
            const data = await response.json();
            alert(`${data.message}\n${data.solution}`);
            return false;
        }
    } catch (error) {
        throw error;
    }
}
