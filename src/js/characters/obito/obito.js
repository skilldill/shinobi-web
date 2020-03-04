import { 
    OBITO,
    OBITO_RUN_LEFT,
    OBITO_RUN_RIGHT,
    OBITO_JUMP,
    OBITO_SHARINGAN,
    OBITO_DO_JUTSU,
    OBITO_PREPARE_JUTSU
} from "./assets";

export const obito = {
    form: OBITO,
    state: {
        isMoveUp: false,
        isMoveDown: false,
        isJump: false,
        isDoJutsu: false
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
    skills: {},
    props: {
        clonesCount: 4
    }
}

export const obitoForm = {
    RUN_LEFT: OBITO_RUN_LEFT,
    RUN_RIGHT: OBITO_RUN_RIGHT,
    JUMP: OBITO_JUMP,
    BASE: OBITO,
    SECRET_JUTSU: OBITO_SHARINGAN,
    DO_JUTSU: OBITO_DO_JUTSU,
    PREPARE_JUTSU: OBITO_PREPARE_JUTSU
}