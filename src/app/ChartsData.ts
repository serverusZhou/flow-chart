class ChartsData {
    /* 所有的元素 */
    public static allEles: any[] = [];
    /* 所有操作信息 */
    public static allInfos: {
        canvasDom: HTMLCanvasElement,
        canvasCtx: CanvasRenderingContext2D,
        canvasPos: {left: number, top: number},
    };
}

export default ChartsData;
