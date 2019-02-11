import * as React from "react";
import Action from "./action/Action";
import { separateClickAndMove } from "./utils/eventUtil";

import * as styles from "./index.scss";

const { Component } = React;

interface IInfo {
    imgSrc: string;
    pointerPos: { x: number, y: number };
}

const createChart = ({ gridWidth, imgRes }:
{
    gridWidth?: number,
    imgRes?: string,
}) =>
class extends Component {
    public canvasRef: React.RefObject<any> = null;
    public staticCanvasRef: React.RefObject<any> = null;

    constructor(props: any) {
        super(props);
        this.canvasRef = React.createRef();
        this.staticCanvasRef = React.createRef();
    }
    public grapDrop(
        ev: React.DragEvent<HTMLDivElement>,
    ): void {
        const pointerPos = { x: Number(ev.clientX.toFixed(2)), y: Number(ev.clientY.toFixed(2)) };
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
                Action.chooseEle({ x: ev.clientX, y: ev.clientY });
            },
            ele: this.canvasRef.current,
            mouseDown: (ev) => {
                Action.setMouseDownEles({ x: ev.clientX, y: ev.clientY });
            },
            move: (ev, lastMovePos, mouseDownPos) => {
                if (mouseDownPos) {
                    Action.moveEle({ x: ev.clientX, y: ev.clientY }, lastMovePos);
                } else {
                    Action.hoverEle({ x: ev.clientX, y: ev.clientY });
                }
            },
            moveEnd: () => {
                Action.clearMouseDownEles();
            },
        });

        /* 初始化绘图参数 */
        Action.chartParasSet(
            {
                canvasDom: this.canvasRef.current,
                imgRes,
                staticCanvasDom: this.staticCanvasRef.current,
            },
        );
        /* 初始化绘图 */
        Action.letDrawWork({
            gridWidth,
        });
    }

    public render(): JSX.Element {
        return (
            <section className={styles.chartContext}>
                <header className={styles.chartBar}>
                    This is the little bar
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
                        className={styles.chartContent}
                        ref={this.canvasRef}
                    />
                    <canvas
                        className={styles.chartContent}
                        style={{zIndex: 100}}
                        ref={this.staticCanvasRef}
                    />
                </div>
            </section>
        );
    }
};

export default createChart;
