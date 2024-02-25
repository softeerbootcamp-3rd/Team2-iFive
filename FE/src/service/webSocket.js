import React, { useEffect, useRef, useState } from "react";

// 위치 정보를 가져오는 util 함수
function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported!"));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                resolve({ latitude, longitude });
            },
            (error) => {
                reject(error);
            }
        );
    });
}

export function useLocationSender() {
    const webSocketRef = useRef(null);
    const lastLocationRef = useRef({ latitude: null, longitude: null });

    useEffect(() => {
        webSocketRef.current = new WebSocket(
            "ws://0.tcp.jp.ngrok.io:14753/idrop?token=eyJhbGciOiJIUzM4NCJ9.eyJhdXRoZW50aWNhdGVVc2VyIjoie1widXNlcklkXCI6XCJkcml2ZXIxXCIsXCJyb2xlXCI6XCJEUklWRVJcIn0iLCJleHAiOjE3MDc4ODI3Njd9.KNTi__aBqKPAGKOyK_b7K5nk0dUK6xMdotSrv7g9O5HwLhC-xMfzyCxDR6-Qse7f"
        );

        const sendLocation = (location) => {
            if (
                webSocketRef.current &&
                webSocketRef.current.readyState === WebSocket.OPEN
            ) {
                webSocketRef.current.send(
                    JSON.stringify({
                        longitude: location.longitude,
                        latitude: location.latitude,
                        createdAt: "2024-02-13T13:45:30"
                    })
                );

                console.log({
                    sender: "driver1",
                    receiver: "parent1",
                    ...location
                });
            }
        };

        const locationInterval = setInterval(() => {
            getCurrentLocation()
                .then((location) => {
                    // 새로운 위치 정보가 성공적으로 얻어지면, 이를 저장하고 서버로 전송합니다.
                    lastLocationRef.current = location;
                    sendLocation(location);
                })
                .catch((error) => {
                    console.error("Error getting location", error);
                    // 위치 정보를 가져오는 데 실패하면, 마지막 유효한 위치 정보를 사용합니다.
                    if (
                        lastLocationRef.current.latitude &&
                        lastLocationRef.current.longitude
                    ) {
                        sendLocation(lastLocationRef.current);
                    }
                });
        }, 1000);
        webSocketRef.current.onopen = () => console.log("WebSocket connected");
        webSocketRef.current.onerror = (error) =>
            console.error("WebSocket error:", error);
        webSocketRef.current.onclose = () =>
            console.log("WebSocket disconnected");
        return () => {
            clearInterval(locationInterval);
            if (webSocketRef.current) {
                webSocketRef.current.close();
            }
        };
    }, []);
}
