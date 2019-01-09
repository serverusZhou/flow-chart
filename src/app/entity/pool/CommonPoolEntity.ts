
/**
 * @author Arvin
 * 基础池子实体类
 */

import BaseEntity from "../BaseEntity";

class CommonPoolEntity extends BaseEntity {
    // 初始时需要放置的一些数据
    public initData: object;
    // 流程图编辑之后的真实数据
    public acturalData: object;
    // 内部空间（可能一些监测点需要放在内部）
    public internalSpacePercent: number[];
}

export default CommonPoolEntity;
