import { BottomSheet } from "../../components/common/Bottomsheet/Bottomsheet";
import Map from "../../components/common/Map/Map";

const url = "https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?";
const clientId = import.meta.env.VITE_NAVER_KEY_ID;
const client = import.meta.env.VITE_NAVER_KEY;
const start = [37.565166, 126.9771586];
const end = [37.5352162, 126.974226];

// const getDirection = async () => {
//     const response = await fetch(
//         `${url}start=37.565166,126.9771586&goal=37.5352162,126.974226`,
//         {
//             headers: {
//                 "X-NCP-APIGW-API-KEY-ID": clientId,
//                 "X-NCP-APIGW-API-KEY": client
//             }
//         }
//     );
//     console.log(response);
// };

export function Locate() {
    // TO DO: 서버에서 데이터 받아와야함
    const childData = {
        name: "육 아들",
        time: "7:00~8:00",
        start: "서울 시청",
        goal: "국민대"
    };

    return (
        <>
            <Map></Map>
            <BottomSheet childData={childData}></BottomSheet>
        </>
    );
}
