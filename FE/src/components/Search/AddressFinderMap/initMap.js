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

            infoWindow.setContent(
                [
                    `<div style="padding:10px;min-width:200px;line-height:150%;">`,
                    `<h4 style="margin-top:5px;">검색 주소 : ${address}</h4><br />`,
                    htmlAddresses.join("<br />"),
                    `</div>`
                ].join("\n")
            );

            map.setCenter(point);
        }
    );
};

function searchCoordinateToAddress(latLng, setNewAddress) {
    naver.maps.Service.reverseGeocode(
        {
            coords: latLng,
            orders: [
                naver.maps.Service.OrderType.ADDR,
                naver.maps.Service.OrderType.ROAD_ADDR
            ].join(",")
        },
        (status, response) => {
            if (status !== naver.maps.Service.Status.OK) {
                return alert("Something went wrong!");
            }

            const { roadAddress, jibunAddress } = response.v2.address;
            const address = roadAddress ?? jibunAddress;
            setNewAddress(address);
        }
    );
}

function generateMarker(map) {
    return new naver.maps.Marker({
        position: map.getCenter(),
        map: map
    });
}

function addDragEventListener({ map, marker, setNewAddress }) {
    naver.maps.Event.addListener(map, "drag", (e) => {
        marker.setPosition(map.getCenter());
    });

    naver.maps.Event.addListener(map, "dragend", (e) => {
        const currentCoords = map.getCenter();
        searchCoordinateToAddress(currentCoords, setNewAddress);
    });
}

export function initMap({ latitude, longitude, mapElement, setNewAddress }) {
    const center = new naver.maps.LatLng(latitude, longitude);
    const mapOptions = {
        center,
        zoom: DEFAULT_ZOOM_SCALE,
        scaleControl: false
    };
    const map = new naver.maps.Map(mapElement, mapOptions);

    const marker = generateMarker(map);
    addDragEventListener({ map, marker, setNewAddress });

    return map;
}
