
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
        const pollEles = ChartsData.allEles.filter((ele) => ele.type === "POOL");
    }
}

export default PoolAction;
