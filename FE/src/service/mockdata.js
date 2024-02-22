export const fakeDriversListData = {
    drivers: [
        {
            driverId: 11231,
            name: "김상민",
            gender: "남",
            image: "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            introduction:
                "아이 셋을 잘 길러낸 아버지 입니다. 아이들을 좋아해서 은퇴하고 픽업 기사로 일하고 있습니다.",
            starRate: 5.0,
            numberOfReviews: 323
        },
        {
            driverId: 2234234,
            name: "김상민",
            gender: "남",
            image: "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            introduction:
                "아이 셋을 잘 길러낸 아버지 입니다. 아이들을 좋아해서 은퇴하고 픽업 기사로 일하고 있습니다.",
            starRate: 5.0,
            numberOfReviews: 323
        },
        {
            driverId: 12341234,
            name: "김상민",
            gender: "남",
            image: "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            introduction:
                "아이 셋을 잘 길러낸 아버지 입니다. 아이들을 좋아해서 은퇴하고 픽업 기사로 일하고 있습니다.",
            starRate: 5.0,
            numberOfReviews: 323
        }
    ]
};

export const fakeHistoryData = [
    {
        pickUpInfoId: 1,
        driverName: "기사1",
        driverImage: "https://profile.jpg",
        startDate: "2024-02-21",
        endDate: "2024-03-19",
        startAddress: "서울특별시 강남구 논현동 58-3 에티버스러닝 학동캠퍼스",
        endAddress: "서울특별시 강남구 학동로31길 15 코마츠",
        status: "픽업중",
        schedule: {
            Wed: {
                min: 30,
                hour: 8
            },
            Mon: {
                min: 30,
                hour: 8
            }
        }
    },
    {
        pickUpInfoId: 2,
        driverName: "기사2",
        driverImage: "https://profile.jpg",
        startDate: "2024-02-21",
        endDate: "2024-03-19",
        startAddress: "서울특별시 강남구 논현동 58-3 에티버스러닝 학동캠퍼스",
        endAddress: "서울특별시 강남구 학동로31길 15 코마츠",
        status: "대기중",
        schedule: {
            Wed: {
                min: 30,
                hour: 8
            },
            Mon: {
                min: 30,
                hour: 8
            }
        }
    },
    {
        pickUpInfoId: 3,
        driverName: "기사4",
        driverImage: "https://profile.jpg",
        startDate: "2024-02-21",
        endDate: "2024-03-19",
        startAddress: "서울특별시 강남구 논현동 58-3 에티버스러닝 학동캠퍼스",
        endAddress: "서울특별시 강남구 학동로31길 15 코마츠",
        status: "만료됨",
        schedule: {
            Wed: {
                min: 30,
                hour: 8
            },
            Mon: {
                min: 30,
                hour: 8
            }
        }
    },
    {
        pickUpInfoId: 4,
        driverName: "기사5",
        driverImage: "https://profile.jpg",
        startDate: "2024-02-21",
        endDate: "2024-03-19",
        startAddress: "서울특별시 강남구 논현동 58-3 에티버스러닝 학동캠퍼스",
        endAddress: "서울특별시 강남구 학동로31길 15 코마츠",
        status: "만료됨",
        schedule: {
            Wed: {
                min: 30,
                hour: 8
            },
            Mon: {
                min: 30,
                hour: 8
            }
        }
    }
];
export const fakeHistoryDetailData = {
    message: "Data Successfully Proceed",
    data: [
        {
            date: "2024-02-19",
            day: "08:30 WEDNESDAY",
            info: {
                status: "픽업 시작",
                startTime: "2024-02-19T08:30:00",
                startImage: "image.url"
            }
        },
        {
            date: "2024-02-19",
            day: "08:30 MONDAY",
            info: {
                status: "픽업 종료",
                startTime: "2024-02-19T08:30:00",
                startImage: "image.url",
                endTime: "2024-02-19T08:30:00",
                endImage: "image.url"
            }
        }
    ]
};
