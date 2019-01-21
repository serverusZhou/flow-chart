
/** 通过图片地址获取图片HTML元素 */
export function getHTMLImageElement(imgSrc: string): HTMLImageElement {
    const img: HTMLImageElement = new Image();
    img.src = imgSrc;
    return img;
}

/** 根据canvas元素的宽高设置合适的canvas分辨率 */
export function setReasonableRes(ele: HTMLCanvasElement): void {
    ele.width = Math.round(ele.offsetWidth);
    ele.height = Math.round(ele.offsetHeight);
}
