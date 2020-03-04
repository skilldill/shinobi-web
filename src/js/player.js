import { scene, mapTerrain } from "./main";

const playerHtml = document.getElementById("player");

const KEY_CODES = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32,
    LETTER_F: 70,
    LETTER_C: 67,
    LETTER_J: 74
}

const FLAT_HEIGHT = 56;

function createClones(player, map) {
    for(let i = 0; i < player.props.clonesCount; i++) {
        const distance = player.position.x + (55 * i - 40);
        const cloneBlock = document.createElement("div");
        const bottom = map.get(distance) ? map.get(distance) + FLAT_HEIGHT : player.position.y;

        cloneBlock.innerHTML = player.form;
        const { style } = cloneBlock;
        style.position = "absolute";
        style.left = `${distance}px`;
        style.bottom = `${bottom}px`;

        scene.append(cloneBlock);

        setTimeout(
            () => scene.removeChild(cloneBlock), 
            4000 + i * 1000
        );
    }
}

function setPlayerPosition(player) {
    playerHtml.style.left = `${player.position.x}px`;
    playerHtml.style.bottom = `${player.position.y}px`;
}

function setPositionRelativeMap(player, map) {
    let target = 0;
    
    if (player.state.isMoveUp) {
        if (player.position.y === FLAT_HEIGHT) {
            target = 7 + player.position.x + player.minValues.MIN_STEP_DISTANCE;
        }
        else {
            target = player.minValues.MIN_STEP_DISTANCE + player.position.x - 14;
        }
    } else {
        target = player.position.x + player.minValues.MIN_STEP_DISTANCE;
    }
    
    if (map.get(target)) {
        if(player.position.y < FLAT_HEIGHT + map.get(target))
            player.position.x = target;
        player.position.y = map.get(target) + FLAT_HEIGHT;
    } else {
        player.position.y = FLAT_HEIGHT;
    }
    
    setPlayerPosition(player);
}

function doJutsu(player, playerForms, jutsu) {
    playerHtml.innerHTML = playerForms.DO_JUTSU;

    setTimeout(() => {
        playerHtml.innerHTML = playerForms.PREPARE_JUTSU;
    }, 100);
    setTimeout(() => {
        playerHtml.innerHTML = playerForms.DO_JUTSU;
    }, 200);
    setTimeout(() => {
        playerHtml.innerHTML = playerForms.PREPARE_JUTSU;
    }, 300);
    setTimeout(() => {
        playerHtml.innerHTML = playerForms.DO_JUTSU;
    }, 400);
    setTimeout(() => {
        playerHtml.innerHTML = playerForms.PREPARE_JUTSU;
    }, 500);
    setTimeout(() => {
        playerHtml.innerHTML = playerForms.DO_JUTSU;
        jutsu(player);
    }, 600);
} 

export function initialPlayer(player, playerForms, map) {
    playerHtml.innerHTML = player.form;
    setPlayerPosition(player);

    console.log(map);

    scene.addEventListener("keydown", (event) => {
        const { keyCode } = event;

        switch(keyCode) {
            case KEY_CODES.SPACE:
            case KEY_CODES.UP:
                if(!player.state.isJump) {
                    player.state.isJump = true;
                    playerHtml.innerHTML = playerForms.JUMP;

                    if (player.state.isMoveUp) {
                        playerHtml.innerHTML = playerForms.RUN_RIGHT;
                        player.position.x += player.minValues.MIN_STEP_DISTANCE * player.minValues.MIN_JUMP_KOEFF;
                    }
    
                    if (player.state.isMoveDown) {
                        playerHtml.innerHTML = playerForms.RUN_LEFT;
                        player.position.x -= player.minValues.MIN_STEP_DISTANCE * player.minValues.MIN_JUMP_KOEFF;
                    }
    
                    player.position.y += player.minValues.MIN_JUMP_DISTANCE;
                    setPlayerPosition(player);
                    setTimeout(() => { 
                        if (player.state.isMoveUp) {
                            player.position.x += player.minValues.MIN_STEP_DISTANCE * player.minValues.MIN_JUMP_KOEFF;
                        }
        
                        if (player.state.isMoveDown) {
                            player.position.x -= player.minValues.MIN_STEP_DISTANCE * player.minValues.MIN_JUMP_KOEFF;
                        }

                        console.log(map.get(player.position.x), player.position.x);

                        setPositionRelativeMap(player, map);
                        playerHtml.innerHTML = playerForms.BASE;
                    }, 100)
                }
                break;

            case KEY_CODES.RIGHT:
                player.state.isMoveUp = true;
                playerHtml.innerHTML = playerForms.RUN_RIGHT;
                player.position.x += player.minValues.MIN_STEP_DISTANCE;
                setPositionRelativeMap(player, map);
                break;

            case KEY_CODES.LEFT:
                player.state.isMoveDown = true;
                playerHtml.innerHTML = playerForms.RUN_LEFT;
                player.position.x -= player.minValues.MIN_STEP_DISTANCE;
                setPositionRelativeMap(player, map);
                break;

            case KEY_CODES.LETTER_J:
                player.state.isDoJutsu = true;
                playerHtml.innerHTML = playerForms.DO_JUTSU;
                break;
            
            case KEY_CODES.LETTER_F:
                player.state.isDoJutsu && doJutsu(player, playerForms, (player) => {
                    playerHtml.innerHTML = playerForms.SECRET_JUTSU;
                });
                break;

            case KEY_CODES.LETTER_C:
                
                player.state.isDoJutsu && doJutsu(player, playerForms, 
                    (player) => createClones(player, map)
                );
                break;

            default:
                break;
        }
    })
    scene.addEventListener("keyup", (event) => {
        const { keyCode } = event;

        switch(keyCode) {
            case KEY_CODES.LEFT:
                player.state.isMoveDown = false;
                playerHtml.innerHTML = playerForms.BASE;
                break;

            case KEY_CODES.RIGHT:
                player.state.isMoveUp = false;
                playerHtml.innerHTML = playerForms.BASE;
                break;

            case KEY_CODES.SPACE:
            case KEY_CODES.UP:
                player.state.isJump = false;
                setPositionRelativeMap(player, map);
                break;

            case KEY_CODES.LETTER_F:
                playerHtml.innerHTML = playerForms.BASE;
                break;

            case KEY_CODES.LETTER_J:
                player.state.isDoJutsu = false;
                playerHtml.innerHTML = playerForms.BASE;
                break;

            default:
                break;
        }
    })
}
