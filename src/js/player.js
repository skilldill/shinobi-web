const playerHtml = document.getElementById("player");
const scene = document.getElementById("scene");
scene.focus();

const KEY_CODES = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32,
    LETTER_F: 70,
    LETTER_C: 67
}

const FLAT_HEIGHT = 56;

function createClones(x, cloud) {
    if(cloud) {
        scene.removeChild(cloud);
    }

    const cloneContainer = document.createElement('div');
    cloneContainer.style.position = "absolute";
    cloneContainer.style.bottom = `${INITIAL_POSITION.BOTTOM}px`;
    cloneContainer.style.left = `${x}px`;
    cloneContainer.innerHTML = KAKASHI_CLONES;
    scene.append(cloneContainer);

    return cloneContainer;
}

function cloudeEffect(x) {
    const cloudContainer = document.createElement('div');
    cloudContainer.style.position = "absolute";
    cloudContainer.style.bottom = `${INITIAL_POSITION.BOTTOM + 5}px`;
    cloudContainer.style.left = `${x}px`;
    cloudContainer.innerHTML = CLOUD;
    scene.append(cloudContainer);

    return cloudContainer
}

function setPlayerPosition(player) {
    playerHtml.style.left = `${player.position.x}px`;
    playerHtml.style.bottom = `${player.position.y}px`;
}

export function initialPlayer(player, playerForms) {
    playerHtml.innerHTML = player.form;
    setPlayerPosition(player);

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
    
                        player.position.y = FLAT_HEIGHT;
                        setPlayerPosition(player);
                        playerHtml.innerHTML = playerForms.BASE;
                    }, 100)
                }
                break;

            case KEY_CODES.RIGHT:
                player.state.isMoveUp = true;
                playerHtml.innerHTML = playerForms.RUN_RIGHT;
                player.position.x += player.minValues.MIN_STEP_DISTANCE;
                setPlayerPosition(player);
                break;

            case KEY_CODES.LEFT:
                player.state.isMoveDown = true;
                playerHtml.innerHTML = playerForms.RUN_LEFT;
                player.position.x -= player.minValues.MIN_STEP_DISTANCE;
                setPlayerPosition(player);
                break;

            case KEY_CODES.DOWN:
                // TODO: seat
                break;
            
            case KEY_CODES.LETTER_F:
                break;

            case KEY_CODES.LETTER_C:
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
                setPlayerPosition(player);
                break;

            case KEY_CODES.LETTER_F:
                playerHtml.innerHTML = playerForms.BASE;
                break;

            default:
                break;
        }
    })
}
