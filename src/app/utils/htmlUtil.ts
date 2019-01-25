
let canvasRender: CanvasRenderingContext2D = null;

/** 通过图片地址获取图片HTML元素 */
export function getHTMLImageElement(imgSrc: string): Promise<HTMLImageElement> {
    return new Promise((reslove) => {
        const img: HTMLImageElement = new Image();
        img.src = imgSrc;
        img.onload = () => {
            reslove(img);
        };
    });
}

/** 根据canvas元素的宽高设置合适的canvas分辨率 */
export function setReasonableRes(ele: HTMLCanvasElement): void {
    ele.width = Math.round(ele.offsetWidth);
    ele.height = Math.round(ele.offsetHeight);
}

/** 获取页面元素在页面中的绝对位置 */
export function getPosition(htmlElement: any): {left: number, top: number} {
    let left = 0;
    let top = 0;
    let ele = htmlElement;
    while (ele) {
        left += ele.offsetLeft;
        top += ele.offsetTop;
        ele = ele.offsetParent;
    }
    return { left, top};
}

/** 将ps转换为坐标 */
export function transPsToCoordinate(htmlElement: HTMLCanvasElement, ps: {
    x: number,
    y: number,
}): {
    x: number,
    y: number,
} {
    return {
        x: (ps.x / htmlElement.offsetWidth) * htmlElement.width,
        y: (ps.y / htmlElement.offsetHeight) * htmlElement.height,
    };
}

export function isPointInPath(point: { x: number, y: number },
                              path: Array<{ x: number, y: number}>): boolean {
    if (!canvasRender) {
        const canvasEle = document.createElement("CANVAS") as HTMLCanvasElement;
        canvasRender = canvasEle.getContext("2d");
    }
    canvasRender.beginPath();
    path.forEach((pos, i) => {
        if (i === 0) {
            canvasRender.moveTo(pos.x, pos.y);
        } else {
            canvasRender.lineTo(pos.x, pos.y);
        }
    });
    canvasRender.closePath();
    return canvasRender.isPointInPath(point.x, point.y);
}
