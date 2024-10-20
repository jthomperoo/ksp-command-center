interface KSPTime {
    year: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
}

function ParseKSPTime(time: number | string): KSPTime | null {
    if (time === 'Infinity') {
        return null;
    }

    let parsedTime = time as number;
    const year = ((parsedTime / (365 * 24 * 3600)) | 0) + 1;
    parsedTime %= 365 * 24 * 3600;
    const day = ((parsedTime / (24 * 3600)) | 0) + 1;
    parsedTime %= 24 * 3600;

    const hour = (parsedTime / 3600) | 0;
    parsedTime %= 3600;
    const minutes = (parsedTime / 60) | 0;
    const seconds = parsedTime % 60 | 0;

    return {
        year: year,
        day: day,
        hour: hour,
        minute: minutes,
        second: seconds,
    };
}

function FormatKSPTime(time: number) {
    const parsedTime = ParseKSPTime(time);

    if (parsedTime === null) {
        return 'Infinity';
    }

    return `Year ${parsedTime.year}, Day ${parsedTime.day}, ${parsedTime.hour}:${parsedTime.minute}:${parsedTime.second}`;
}

function FormatKSPDuration(time: number | string) {
    const parsedTime = ParseKSPTime(time);

    if (parsedTime === null) {
        return 'Infinity';
    }

    parsedTime.year -= 1;
    parsedTime.day -= 1;

    let durationString = `${parsedTime.hour}H:${parsedTime.minute}M:${parsedTime.second}S`;
    if (parsedTime.day !== 0) {
        durationString = `Day ${parsedTime.day}, ${durationString}`;
    }

    if (parsedTime.year !== 0) {
        durationString = `Year ${parsedTime.year}, ${durationString}`;
    }

    return durationString;
}

export { FormatKSPDuration, FormatKSPTime, ParseKSPTime };

export type { KSPTime };
