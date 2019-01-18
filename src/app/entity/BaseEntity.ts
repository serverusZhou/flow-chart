
/**
 * @author Arvin
 * @description 实体基础类
 */

import { DrawMethod, EntityType } from "../constants/entity";

export default class BaseEntity {
    public id: string; // 唯一标志
    public name: string; // 名称（一般用于显示）
    public type: EntityType; // 类型（分类的大类型）
    public entityKey: string; // 每个实体的单独类型（用于与具体的实体map）
    public zIndex: number; // 层级秩序
    public points: Array<{x: number, y: number}>; // 构建实体的点集合
    public drawMethod: DrawMethod; // 绘图方式
    public image: HTMLImageElement; // 图片（new Image）
    public baseColor: string = "#000"; // 基础颜色
}
