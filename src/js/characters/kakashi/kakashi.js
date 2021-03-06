import { 
    KAKASHI,
    KAKASHI_RUN_LEFT,
    KAKASHI_RUN_RIGHT,
    KAKASHI_JUMP,
    KAKASHI_CHIDORY,
    KAKASHI_CLONES,
    CLOUD
} from "./assets";

export const kakashi = {
    form: KAKASHI,
    state: {
        isMoveUp: false,
        isMoveDown: false,
        isJump: false,
    },
    position: {
        x: 60,
        y: 56,
    },
    minValues: {
        MIN_STEP_DISTANCE: 15,
        MIN_JUMP_DISTANCE: 90,
        MIN_JUMP_KOEFF: 4
    },
    skills: {}
}

export const kakashiForm = {
    RUN_LEFT: KAKASHI_RUN_LEFT,
    RUN_RIGHT: KAKASHI_RUN_RIGHT,
    JUMP: KAKASHI_JUMP,
    BASE: KAKASHI
}