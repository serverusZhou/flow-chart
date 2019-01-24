
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
export function getPosition(htmlElement: any) {
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
