type Point = {
    latitude: number;
    longitude: number;
};

export const checkPointInRadius = (point: Point, target: Point & { radius: number }) => {
    const distanceSquared =
        Math.pow(point.latitude - target.latitude, 2) + Math.pow(point.longitude - target.longitude, 2);
    const radiusSquared = Math.pow(target.radius, 2);
    return distanceSquared <= radiusSquared;
};
