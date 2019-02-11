
import ChartsData from "../ChartsData";
import PoolAction from "./PoolAction";

import {
    getPosition,
    isPointInPath,
    setReasonableRes,
    transPsToCoordinate,
 } from "../utils/htmlUtil";

interface IChartParasSet {
    canvasDom: HTMLCanvasElement;
    staticCanvasDom: HTMLCanvasElement;
    imgRes?: string;
}

function getCoordinate(clientPos: any) {
    return transPsToCoordinate(ChartsData.allInfos.canvasDom, {
        x: Number((clientPos.x - ChartsData.allInfos.canvasPos.left).toFixed(2)),
        y: Number((clientPos.y - ChartsData.allInfos.canvasPos.top).toFixed(2)),
    });
}

function getElesAtAPoint(clientPos: {x: number, y: number}): any[] {
    const choosenEles: any[] = [];
    const pointPos = getCoordinate(clientPos);
    ChartsData.allEles.forEach((ele) => {
            if (isPointInPath(pointPos, ele.points)) {
                choosenEles.push(ele);
            }
        });
    return choosenEles;
}

function drawGrid(ctx: CanvasRenderingContext2D, dom: HTMLCanvasElement, width: number = 5) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(192,192,192,1)";
    for (let i = 0; i < dom.width; i += width) {
        // console.log("domdom", dom);
        ctx.moveTo(width * i, 0);
        ctx.lineTo(width * i, dom.height);
    }
    for (let i = 0; i < dom.height; i += width) {
      ctx.moveTo(0, width * i);
      ctx.lineTo(dom.width, width * i);
    }
    ctx.stroke();
    ctx.closePath();
  }

class Action {

    public static getAllEles(): any[] {
        return ChartsData.allEles;
    }

    public static addEle(eleObj: any): any {
        switch (eleObj.type) {
            case "POOL":
                eleObj.pointCoordinate = getCoordinate(eleObj.pointerPos);
                (new PoolAction()).add(eleObj);
                break;
            default:
                throw new Error(`没有实体类对应${eleObj.type}类型`);
        }
    }

    public static chooseEle(clientPos: {x: number, y: number}): any[] {
        return getElesAtAPoint(clientPos);
    }

    public static setMouseDownEles(mouseDownPos: {x: number, y: number}) {
        ChartsData.allInfos.mouseDownEles = getElesAtAPoint(mouseDownPos);
    }

    public static clearMouseDownEles() {
        ChartsData.allInfos.mouseDownEles = [];
    }

    public static moveEle(movePos: {x: number, y: number}, lastMovePos: {x: number, y: number}): void {
        const atEles = ChartsData.allInfos.mouseDownEles;
        const deviation = {
            x: getCoordinate(movePos).x - getCoordinate(lastMovePos).x,
            y: getCoordinate(movePos).y - getCoordinate(lastMovePos).y,
        };
        // TODO 预留预处理atEles的关系
        // arrangeAllAtEles();
        atEles.forEach((ele) => {
            switch (ele.type) {
                case "POOL":
                    (new PoolAction()).updatePosition(ele.id,
                        {
                            x: ele.points[0].x + deviation.x,
                            y: ele.points[0].y + deviation.y,
                        });
            }
        });
        // const moveAtEle = getElesAtAPoint(movePos);
        // console.log("moveAtElemoveAtEle", moveAtEle);
    }

    public static hoverEle(pos: {x: number, y: number}) {
        ChartsData.allEles.forEach((e) => { e.shouldDrawHover = false; });
        const eles = getElesAtAPoint(pos);
        eles.forEach((ele) => { ele.shouldDrawHover = true; });
    }

    public static letDrawWork({gridWidth}: {
        gridWidth: number,
    }) {
        const allEles = ChartsData.allEles;
        const { canvasCtx, canvasDom, staticCanvasCtx } = ChartsData.allInfos;
        drawGrid(staticCanvasCtx, canvasDom, gridWidth); // 画格子
        // 设置基础样式参数
        canvasCtx.lineWidth = 1;
        canvasCtx.strokeStyle = "#000";
        canvasCtx.save();

        (function loop() {
            canvasCtx.clearRect(0, 0, canvasDom.width, canvasDom.height);
            // canvasCtx.clearRect(0, 0, canvasDom.width, canvasDom.height);
            allEles.forEach((ele: any) => {
                    /**
                     *  对于某一个特定的类型可以inject特定的draw方法
                     *  此方法是为了应对不时之需，来不及重新设计时可用
                     *  但后面需调整为不再需要此方法
                     *  需特别注意此方法性能
                     */
                    if (ele.draw && typeof ele.draw === "function") {
                        console.warn("注入draw方法只是为了避免一时之需，请用其他方式替换！！");
                        ele.draw(canvasCtx, ele);
                    } else {
                        switch (ele.type) {
                            case "POOL":
                                // 需调用POOL对应的action中的draw方法
                                PoolAction.draw(canvasCtx, ele);
                                break;
                            default:
                                throw new Error(`${ele.type}类型没有对应的draw方法！！`);
                        }
                    }
                });
            requestAnimationFrame(loop);
        })();
    }

    public static chartParasSet({ canvasDom, staticCanvasDom, imgRes }: IChartParasSet) {
        if (imgRes) {
            const res = imgRes.split("*");
            canvasDom.width = Math.round(Number(res[0]));
            canvasDom.height = Math.round(Number(res[1]));
            staticCanvasDom.width = Math.round(Number(res[0]));
            staticCanvasDom.height = Math.round(Number(res[1]));
        } else {
            setReasonableRes(canvasDom);
        }
        ChartsData.allInfos = {
            canvasCtx: canvasDom.getContext("2d"),
            canvasDom,
            canvasPos: getPosition(canvasDom),
            mouseDownEles: null,
            staticCanvasCtx: staticCanvasDom.getContext("2d"),
            staticCanvasDom,
        };
    }
}
export default Action;
