
import ChartsData from "../ChartsData";
import PoolAction from "./PoolAction";

import { setReasonableRes } from "../utils/htmlUtil";

interface IChartParasSet {
    canvasDom: HTMLCanvasElement;
    imgRes?: string;
}

class Action {

    public static getAllEles(): any[] {
        return ChartsData.allEles;
    }

    public static addEle(eleObj: any): any {
        switch (eleObj.type) {
            case "POOL":
                (new PoolAction()).add(eleObj);
                break;
            default:
                throw new Error(`没有实体类对应${eleObj.type}类型`);
        }

    }

    public static letDrawWork() {
        const allEles = ChartsData.allEles;
        const { canvasCtx } = ChartsData.allInfos;
        (function loop() {
            allEles.forEach((ele: any) => {
                /**
                 *  对于某一个特定的类型可以设定特定的draw方法
                 *  此方法是为了应对不时之需，来不及重新设计时可用
                 *  但后面需调整为不再需要此方法
                 *  需特别注意此方法性能
                 */
                if (ele.draw && typeof ele.draw === "function") {
                    ele.draw(canvasCtx);
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

    public static chartParasSet({ canvasDom, imgRes }: IChartParasSet) {
        if (imgRes) {
            const res = imgRes.split("*");
            canvasDom.width = Math.round(Number(res[0]));
            canvasDom.height = Math.round(Number(res[1]));
        } else {
            setReasonableRes(canvasDom);
        }
        ChartsData.allInfos.canvasDom = canvasDom;
        ChartsData.allInfos.canvasCtx = canvasDom.getContext("2d");
    }
}
export default Action;
