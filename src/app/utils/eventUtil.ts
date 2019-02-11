
/** 为元素实现click和move的区分 */

export function separateClickAndMove({ele, click, mouseDown, move, moveEnd}: {
    ele: HTMLElement,
    click?: (ev: MouseEvent) => void
    mouseDown?: (ev: MouseEvent) => void
    move?: (ev: MouseEvent, lastMovePos: {x: number, y: number}, mousedownPos?: {x: number, y: number}) => void,
    moveEnd?: (ev: MouseEvent) => void,
}) {
    let mousedownPos: {x: number, y: number} = null;
    let lastMovePos: {x: number, y: number} = null;

    ele.onmousedown = (ev) => {
        ev.stopPropagation();
        mousedownPos = { x: ev.clientX, y: ev.clientY };
        lastMovePos = { x: ev.clientX, y: ev.clientY };
        if (mouseDown) { mouseDown(ev); }
    };

    ele.onmouseup = (ev) => {
        if (
            mousedownPos &&
            mousedownPos.x === ev.clientX &&
            mousedownPos.y === ev.clientY
        ) {
            if (click) { click(ev); }
        } else {
            if (moveEnd) { moveEnd(ev); }
        }
        mousedownPos = null;
        lastMovePos = null;
    };

    ele.onmousemove = (ev) => {
        if (move) { move(ev, lastMovePos, mousedownPos); }
        lastMovePos = { x: ev.clientX, y: ev.clientY };
    };

    ele.onmouseout = (ev) => {
        mousedownPos = null;
        if (moveEnd) { moveEnd(ev); }
        lastMovePos = null;
    };
}
