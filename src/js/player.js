const player = document.getElementById("player");
const scene = document.getElementById("scene");

scene.focus();

const INITIAL_POSITION = {
    LEFT: 160,
    BOTTOM: 60
}

const KEY_CODES = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32
}

const MIN_VALUES = {
    MIN_STEP_DISTANCE: 15,
    MIN_JUMP_DISTANCE: 90,
    MIN_JUMP_KOEFF: 4
}

function setPlayerPosition(x, y) {
    player.style.bottom = `${y}px`;
    player.style.left = `${x}px`;
}

function initialPlayer() {
    let leftPos = INITIAL_POSITION.LEFT;
    let bottomPos = INITIAL_POSITION.BOTTOM;
    let isMoveUp = false;
    let isMoveDown = false;
    let isJump = false;

    setPlayerPosition(leftPos, bottomPos);

    scene.addEventListener("keydown", (event) => {
        const { keyCode } = event;

        switch(keyCode) {
            case KEY_CODES.SPACE:
            case KEY_CODES.UP:
                if(!isJump) {
                    isJump = true;

                    if (isMoveUp) {
                        leftPos += MIN_VALUES.MIN_STEP_DISTANCE * MIN_VALUES.MIN_JUMP_KOEFF;
                    }
    
                    if (isMoveDown) {
                        leftPos -= MIN_VALUES.MIN_STEP_DISTANCE * MIN_VALUES.MIN_JUMP_KOEFF;
                    }
    
                    bottomPos += MIN_VALUES.MIN_JUMP_DISTANCE;
                    setPlayerPosition(leftPos, bottomPos);
                    setTimeout(() => { 
                        if (isMoveUp) {
                            leftPos += MIN_VALUES.MIN_STEP_DISTANCE * MIN_VALUES.MIN_JUMP_KOEFF;
                        }
        
                        if (isMoveDown) {
                            leftPos -= MIN_VALUES.MIN_STEP_DISTANCE * MIN_VALUES.MIN_JUMP_KOEFF;
                        }
    
                        bottomPos = INITIAL_POSITION.BOTTOM;
                        setPlayerPosition(leftPos, bottomPos);
                    }, 100)
                }
                break;

            case KEY_CODES.RIGHT:
                isMoveUp = true;
                leftPos += MIN_VALUES.MIN_STEP_DISTANCE;
                setPlayerPosition(leftPos, bottomPos);
                break;

            case KEY_CODES.LEFT:
                isMoveDown = true;
                leftPos -= MIN_VALUES.MIN_STEP_DISTANCE;
                setPlayerPosition(leftPos, bottomPos);
                break;

            case KEY_CODES.DOWN:
                // TODO: seat
                break;

            default:
                break;
        }
    })
    scene.addEventListener("keyup", (event) => {
        const { keyCode } = event;

        switch(keyCode) {
            case KEY_CODES.LEFT:
                isMoveDown = false;

            case KEY_CODES.RIGHT:
                isMoveUp = false;

            case KEY_CODES.SPACE:
            case KEY_CODES.UP:
                isJump = false;
                setPlayerPosition(leftPos, INITIAL_POSITION.BOTTOM);
                break;

            default:
                break;
        }
    })
}

export {
    player,
    initialPlayer
}