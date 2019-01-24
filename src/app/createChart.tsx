import * as React from "react";
import Action from "./action/Action";
import { separateClickAndMove } from "./utils/eventUtil";

import * as styles from "./index.scss";

const { Component } = React;

interface IInfo {
    imgSrc: string;
    pointerPos: { left: number, top: number };
}

const createChart = ({ imgRes }:
{
    imgRes?: string,
}) =>
class extends Component {
    public canvasRef: React.RefObject<any> = null;

    constructor(props: any) {
        super(props);
        this.canvasRef = React.createRef();
    }
    public grapDrop(
        ev: React.DragEvent<HTMLDivElement>,
    ): void {
        const pointerPos = {
            left: ev.clientX,
            top: ev.clientY,
        };
        const receivedMsg: string = ev.dataTransfer.getData("eleMsg");
        const extractInfo: IInfo = JSON.parse(receivedMsg);
        extractInfo.pointerPos = pointerPos;
        Action.addEle(extractInfo);
    }

    public componentWillUnmount() {
        console.log("do some will unmount thing!!");
    }

    public componentDidMount() {
        this.init();
    }

    public init() {
        /** 注册事件 */
        separateClickAndMove({
            click: (ev) => {
                console.log("To choose");
            },
            ele: this.canvasRef.current,
            move: (ev, mouseDownPos) => {
                if (mouseDownPos) {
                    console.log("To move");
                } else {
                    console.log("To hover");
                }
            },
            moveEnd: (ev) => {
                console.log("Do some set work");
            },
        });

        /* 初始化绘图参数 */
        Action.chartParasSet(
            {
                canvasDom: this.canvasRef.current,
                imgRes,
            },
        );
        /* 初始化绘图 */
        Action.letDrawWork();
    }

    public render(): JSX.Element {
        return (
            <section className={styles.chartContext}>
                <header className={styles.chartBar}>
                    this is the little bar
                </header>
                <div
                    className={styles.chartWarp}
                    onDrop={this.grapDrop}
                    onDragOver={
                        (ev: React.DragEvent<HTMLDivElement>) =>
                        ev.preventDefault()
                    }
                >
                    <canvas
                        onClick={
                            (ev: React.DragEvent<HTMLCanvasElement>) =>
                            ev.preventDefault()
                        }
                        className={styles.chartContent}
                        ref={this.canvasRef}
                    />
                </div>
            </section>
        );
    }
};

export default createChart;
