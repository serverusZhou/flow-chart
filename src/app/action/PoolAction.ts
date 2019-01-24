
import * as UUID from "uuid";

import ChartsData from "../ChartsData";
import PoolEntity from "../entity/pool/CommonPoolEntity";
import { getHTMLImageElement } from "../utils/htmlUtil";

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
        poolEntity.id = UUID.v1();
        poolEntity.type = ele.type;
        poolEntity.entityKey = ele.entityKey;
        poolEntity.points = [{
            x: ele.pointerPos.left - ChartsData.allInfos.canvasPos.left,
            y: ele.pointerPos.top - ChartsData.allInfos.canvasPos.top,
        }];
        poolEntity.size = ele.size;
        poolEntity.image = await getHTMLImageElement(ele.imgSrc);
        ChartsData.allEles.push(poolEntity);
        return poolEntity;
    }
}

export default PoolAction;
