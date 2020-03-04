/**
 * Создаёт map местности с препятсвиями
 * @param {Массив препятсвий с высотой и шириной} obstacles 
 */
export function terrainMapGenerator(obstacles) {
    const map = new Map();

    obstacles.forEach((obstacle) => {
        const { x, width, height } = obstacle;
        for (let i = 0; i < width; i++) {
            map.set(x + i, height);
        }
    });

    return map;
}

export function renderMap(obstacles, scene) {
    obstacles.forEach((obstacle) => {
        const obstacleHtml = document.createElement("div");
        const { style } = obstacleHtml;
        
        style.position = "absolute";
        style.left = `${obstacle.x}px`;
        style.bottom = `${obstacle.y}px`;
        style.width = `${obstacle.width}px`;
        style.height = `${obstacle.height}px`;
        style.backgroundColor = "black";

        scene.append(obstacleHtml);
    })
}

export const obstacles = [
    { x: 10, y: 60, width: 40, height: 20 },
    { x: 160, y: 60, width: 60, height: 30 },
    { x: 250, y: 60, width: 80, height: 20 },
    { x: 410, y: 60, width: 20, height: 50 },
    { x: 600, y: 60, width: 50, height: 30 },
]