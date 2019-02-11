
import * as UUID from "uuid";

import ChartsData from "../ChartsData";
import PoolEntity from "../entity/pool/CommonPoolEntity";
import { getHTMLImageElement, transPsToCoordinate } from "../utils/htmlUtil";

class PoolAction {

    public static draw(ctx: CanvasRenderingContext2D, poolEntity: PoolEntity): void {
        if (poolEntity.image) {
            ctx.drawImage(
                poolEntity.image,
                poolEntity.points[0].x,
                poolEntity.points[0].y,
                poolEntity.size.width,
                poolEntity.size.height,
            );
        }
        if (poolEntity.shouldDrawHover) {
            ctx.beginPath();
            poolEntity.points.forEach((point, index) => {
                if (index === 0) {
                    ctx.moveTo(point.x, point.y);
                } else {
                    ctx.lineTo(point.x, point.y);
                }
            });
            ctx.closePath();
            ctx.stroke();
        }
    }

    public async add(ele: any): Promise<PoolEntity> {
        const poolEntity: PoolEntity = new PoolEntity();
        const startPoint = ele.pointCoordinate;
        poolEntity.id = UUID.v1();
        poolEntity.type = ele.type;
        poolEntity.entityKey = ele.entityKey;
        poolEntity.zIndex = 0;
        poolEntity.points = [
            startPoint,
            { x: startPoint.x + ele.size.width, y: startPoint.y },
            { x: startPoint.x + ele.size.width, y: startPoint.y + ele.size.height},
            { x: startPoint.x, y: startPoint.y + ele.size.height},
            startPoint,
        ];
        poolEntity.size = ele.size;
        poolEntity.image = await getHTMLImageElement(ele.imgSrc);
        poolEntity.initData = {};
        poolEntity.acturalData = {};
        ChartsData.allEles.push(poolEntity);
        return poolEntity;
    }

    public updatePosition(eleId: string, position: {x: number, y: number}): void {
        // console.log("positionposition", position);
        // const poolEles = ChartsData.allEles.filter((ele) => ele.type === "POOL");
        const elemment = ChartsData.allEles.find((ele) => ele.id === eleId);
        if (elemment.type === "POOL") {
            elemment.points = [
                position,
                { x: position.x + elemment.size.width, y: position.y },
                { x: position.x + elemment.size.width, y: position.y + elemment.size.height},
                { x: position.x, y: position.y + elemment.size.height},
                position,
            ];
        }
    }
}

export default PoolAction;
