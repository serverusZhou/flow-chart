
import * as UUID from "uuid";

import ChartsData from "../ChartsData";
import PoolEntity from "../entity/pool/CommonPoolEntity";
import { getHTMLImageElement } from "../utils/htmlUtil";

class PoolAction {

    public static draw(ctx: CanvasRenderingContext2D, poolEntity: PoolEntity): void {
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#000";
        ctx.moveTo(0, 0);
        ctx.lineTo(50, 50);
        ctx.stroke();
        if (poolEntity.image) {
            ctx.drawImage(poolEntity.image, 20, 10);
        }
        ctx.save();
    }

    public async add(ele: any): Promise<PoolEntity> {
        const poolEntity: PoolEntity = new PoolEntity();
        poolEntity.id = UUID.v1();
        poolEntity.type = ele.type;
        poolEntity.entityKey = ele.entityKey;
        poolEntity.image = await getHTMLImageElement(ele.imgSrc);
        ChartsData.allEles.push(poolEntity);
        return poolEntity;
    }
}

export default PoolAction;
