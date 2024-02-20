// 위도와 경도를 라디안 단위로 변환하는 함수
function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

// 두 지점 간의 거리를 계산하는 함수 (단위: 미터)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const EARTHRADIUSKM = 6371; // 지구의 반지름 (단위: 킬로미터)

    // 위도와 경도를 라디안으로 변환
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);

    // 두 지점의 위도 차와 경도 차의 제곱을 더하여 거리를 계산
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degreesToRadians(lat1)) *
            Math.cos(degreesToRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c;

    return distance * 1000; // 거리를 미터로 반환
}

// 반경 300미터 이내에 있는지 여부를 판단하는 함수
export function isWithinRadius(lat1, lon1, lat2, lon2) {
    const distance = calculateDistance(lat1, lon1, lat2, lon2);
    return distance <= 300; // 거리가 300미터 이내인지 여부를 반환
}
