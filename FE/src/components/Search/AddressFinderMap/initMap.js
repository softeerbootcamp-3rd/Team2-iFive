const DEFAULT_ZOOM_SCALE = 15;

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
