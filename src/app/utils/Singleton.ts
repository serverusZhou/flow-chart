
class ActionSingleton {
    public static getInstance(): ActionSingleton {
        if (!this.ActionSingletoninstance) {
            this.ActionSingletoninstance = new ActionSingleton();
        }
        return this.ActionSingletoninstance;
    }

    public static removeInstance(clazz: any): void {
        const index: number = this.classKeys.indexOf(clazz);
        if (index === -1 ) {
            return null;
        }
        this.classKeys.splice(index, 1);
        this.classValues.splice(index, 1);
    }

    public static getFunValue(clazz: () => any): any {
        const funs: Array<() => void> = this.classKeys;
        const length: number = funs.length;
        for (let i: number = 0; i < length; i++) {
            if (clazz === funs[i]) {
                return this.classValues[i];
            }
        }
        return null;
    }
    public static getInstanceOrCreate(clazz: any): any {
        let obj: any = this.getFunValue(clazz);
        if (obj) {
            return obj;
        }
        obj = new clazz();
        if (!(obj instanceof ActionSingleton)) {
            this.classKeys.push(clazz);
            this.classValues.push(obj);
        }
        return obj;
    }
    private static classKeys: Array<() => void> = [];
    private static classValues: any[] = [];
    private static ActionSingletoninstance: ActionSingleton;
    protected onDestroy: () => void;

    constructor() {
        const clazz: any = this.constructor;
        if (!clazz) {
            return;
        }
        if (ActionSingleton.classKeys.indexOf(clazz) !== -1) {
            throw new Error(this + " 只允许实例化一次！");
        } else {
            ActionSingleton.classKeys.push(clazz);
            ActionSingleton.classValues.push(this);
        }
        return;
    }

    public destroy(o: any = null): void {
        this.onDestroy();
        ActionSingleton.removeInstance(this.constructor);
    }
}

export default ActionSingleton;
