export function transformSchedule(schedule) {
    const daysInfo = {
        Mon: { order: 1, translation: "월" },
        Tue: { order: 2, translation: "화" },
        Wed: { order: 3, translation: "수" },
        Thu: { order: 4, translation: "목" },
        Fri: { order: 5, translation: "금" },
        Sat: { order: 6, translation: "토" },
        Sun: { order: 7, translation: "일" }
    };

    const makeScheduleObject = (day) => ({
        day,
        min: schedule[day].min,
        hour: schedule[day].hour
    });

    const translateDay = (schedule) => ({
        ...schedule,
        day: daysInfo[schedule.day].translation
    });

    const sortByDay = (a, b) => daysInfo[a.day].order - daysInfo[b.day].order;

    const scheduleArray = Object.keys(schedule).map(makeScheduleObject);
    scheduleArray.sort(sortByDay);
    const translatedScheduleArray = scheduleArray.map(translateDay);

    return translatedScheduleArray;
}
