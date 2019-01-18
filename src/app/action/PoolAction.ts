
import * as UUID from "uuid";
import PoolEntity from "../entity/pool/CommonPoolEntity";

class PoolAction {

    public static getPoolActionInstance() {
        if (this.poolActionInstance === null) {
            this.poolActionInstance = new PoolAction();
        }
        return this.poolActionInstance;
    }

    private static poolActionInstance: PoolAction = null;

    public add(ele: any): PoolEntity {
        const poolEntity: PoolEntity = new PoolEntity();
        poolEntity.id = UUID.v1();
        console.log(ele);
        return poolEntity;
    }
}

export default PoolAction;
