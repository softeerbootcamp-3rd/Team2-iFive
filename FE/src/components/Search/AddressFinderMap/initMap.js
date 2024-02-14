const DEFAULT_ZOOM_SCALE = 15;

const searchAddressToCoordinate = (address) => {
    naver.maps.Service.geocode(
        {
            query: address
        },
        (status, response) => {
            if (status === naver.maps.Service.Status.ERROR) {
                return alert("Something Wrong!");
            }

            // if (response.v2.meta.totalCount === 0) {
            //     return alert(`totalCount ${response.v2.meta.totalCount}`);
            // }

            const item = response.v2.addresses[0];
            const point = new naver.maps.Point(item.x, item.y);
            const htmlAddresses = [];

            if (item.roadAddress) {
                htmlAddresses.push(`[도로명 주소] ${item.roadAddress}`);
            }

            if (item.jibunAddress) {
                htmlAddresses.push(`[지번 주소] ${item.jibunAddress}`);
            }

            if (item.englishAddress) {
                htmlAddresses.push(`[영문명 주소] ${item.englishAddress}`);
            }

            map.setCenter(point);
        }
    );
};
