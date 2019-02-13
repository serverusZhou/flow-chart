
import * as UUID from "uuid";

import ChartsData from "../ChartsData";
import PoolEntity from "../entity/pool/CommonPoolEntity";
import { getHTMLImageElement, transPsToCoordinate } from "../utils/htmlUtil";

class PoolAction {
    // 绘图
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

    // 新增
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

    // 删除
    public delete(id: string): any {
        const elemment = ChartsData.allEles.find((ele) => ele.id === id);
        return elemment;
    }

    // 更新位置
    public updatePosition(eleId: string, position: {x: number, y: number}): any {
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
        return elemment;
    }
}

export default PoolAction;
