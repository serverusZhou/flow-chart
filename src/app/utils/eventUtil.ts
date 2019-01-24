
/** 为元素实现click和move的区分 */

export function separateClickAndMove({ele, click, move, moveEnd}: {
    ele: HTMLElement,
    click?: (ev: MouseEvent) => void
    move?: (ev: MouseEvent, mousedownPos?: {x: number, y: number}) => void,
    moveEnd?: (ev: MouseEvent) => void,
}) {
    let mousedownPos: {x: number, y: number} = null;

    ele.onmousedown = (ev) => {
        ev.stopPropagation();
        mousedownPos = {
            x: ev.clientX,
            y: ev.clientY,
        };
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
    };

    ele.onmousemove = (ev) => {
        if (move) { move(ev, mousedownPos); }
    };

    ele.onmouseout = (ev) => {
        mousedownPos = null;
        if (moveEnd) { moveEnd(ev); }
    };
}
