class ChartsData {
    /* 所有的元素 */
    public static allEles: any[] = [];
    /* 所有操作信息 */
    public static allInfos: {
        canvasDom: HTMLCanvasElement,
        staticCanvasCtx: CanvasRenderingContext2D, // 用于绘画不变的图像
        canvasCtx: CanvasRenderingContext2D,
        canvasPos: {left: number, top: number}, // 画布在页面中的绝对位置
        mouseDownEles: any[],
    };
}

export default ChartsData;
