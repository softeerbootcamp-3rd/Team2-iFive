import { useSearchParams } from "react-router-dom";
import { BottomSheet } from "../../components/common/Bottomsheet/Bottomsheet";
import { DriverMap } from "../../components/Map/DriverMap";

const url = "https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?";
const clientId = import.meta.env.VITE_NAVER_KEY_ID;
const client = import.meta.env.VITE_NAVER_KEY;
const start = [37.565166, 126.9771586];
const end = [37.5352162, 126.974226];

// 경로 api 요청 로직. 상의 후 제거 여부 결정
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

const userType = {
    parent: 0,
    driver: 1
};

export function Location({ userRole = 1, userName = "육종호" }) {
    // TO DO: 출발지, 목적지, 기사 데이터 받아와서 map에 넘겨주기
    // useEffect로 기사 변경 감지 후
    // 이러면 Locate 페이지 전체가 리렌더링 되는 문제가 생김

    const [query] = useSearchParams();
    const type = query.get("type");
    const render = type == "driver" ? <DriverMap /> : <DriverMap />;

    // TO DO: 서버에서 데이터 받아와야함
    const childData = {
        name: "육 아들",
        time: "7:00~8:00",
        start: "서울 시청",
        goal: "국민대"
    };

    return (
        <>
            {render}
            <BottomSheet
                childData={childData}
                userRole={userType.driver}
            ></BottomSheet>
        </>
    );
}
