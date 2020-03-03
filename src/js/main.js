import "../style/style.scss";
import { initialPlayer } from "./player";
import { characters } from "./characters";

const {
    kakashi
} = characters;

initialPlayer(kakashi.data, kakashi.skins);