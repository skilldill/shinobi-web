import { 
    KAKASHI,
    KAKASHI_JUMP,
    KAKASHI_CHIDORY,
    KAKASHI_CLONES,
    CLOUD
} from "./assets";

const player = document.getElementById("player");
const scene = document.getElementById("scene");

scene.focus();

const INITIAL_POSITION = {
    LEFT: 160,
    BOTTOM: 56
}

const KEY_CODES = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32,
    LETTER_F: 70,
    LETTER_C: 67
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

function initialPlayer() {
    player.innerHTML = KAKASHI;
    let leftPos = INITIAL_POSITION.LEFT;
    let bottomPos = INITIAL_POSITION.BOTTOM;
    let isMoveUp = false;
    let isMoveDown = false;
    let isJump = false;

    setPlayerPosition(leftPos, bottomPos);

    scene.addEventListener("keydown", (event) => {
        const { keyCode } = event;

        // console.log(keyCode);

        switch(keyCode) {
            case KEY_CODES.SPACE:
            case KEY_CODES.UP:
                if(!isJump) {
                    isJump = true;
                    player.innerHTML = KAKASHI_JUMP;

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
                        player.innerHTML = KAKASHI;
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
            
            case KEY_CODES.LETTER_F:
                player.innerHTML = KAKASHI_CHIDORY;
                break;

            case KEY_CODES.LETTER_C:
                const currentPos = leftPos - 45;
                let cloud = cloudeEffect(currentPos);
                let clones;
                setTimeout(() => clones = createClones(currentPos, cloud), 300);
                setTimeout(() => cloud = cloudeEffect(currentPos), 3000);
                setTimeout(() => {
                    scene.removeChild(clones);
                    scene.removeChild(cloud);
                }, 3100)

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

            case KEY_CODES.LETTER_F:
                player.innerHTML = KAKASHI;
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