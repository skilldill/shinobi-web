import "../style/style.scss";
import { initialPlayer } from "./player";
import { characters } from "./characters";
import { terrainMapGenerator, renderMap, obstacles } from "./terrain";

export const scene = document.getElementById("scene");
scene.focus();
renderMap(obstacles, scene);
const mapTerrain = terrainMapGenerator(obstacles);

const {
    kakashi
} = characters;

initialPlayer(kakashi.data, kakashi.skins, mapTerrain);