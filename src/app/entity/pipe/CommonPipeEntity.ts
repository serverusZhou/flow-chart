
/**
 * @author Arvin
 * 基础管道实体类
 */

import { LineType } from "../../constants/entity";
import BaseEntity from "../BaseEntity";

class CommonPipeEntity extends BaseEntity {
    public lineType: LineType;
    // 是否显示动画
    public isAnimate: boolean;
}

export default CommonPipeEntity;
