
import ChartsData from "../ChartsData";
import PoolAction from "./PoolAction";

const poolActionInstance = PoolAction.getPoolActionInstance();

class BasicAction {
    public getAllEles(): any[] {
        const allEles: any[]  = [];
        return allEles;
    }
    public addEle(eleObj: any): any {
        switch (eleObj.type) {
            case "POOL":
                const addedPool = poolActionInstance.add(eleObj);
                ChartsData.allEles.push(addedPool);
                break;
            default:
                throw new Error(`(${eleObj.type}) type is not right, please check the type value`);
        }

    }
}
export default BasicAction;
