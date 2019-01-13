export interface INumberSprite {
    tx: number;
    ty: number;
    sx: number;
    sy: number;
    w: number;
    h: number;
    scale?: {
        x: number,
        y: number
    },
    row?: number;
    color?: string;
    key?: string;
    numbers?: number[];
    zIndex?: number;
}