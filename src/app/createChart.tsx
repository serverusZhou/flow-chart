import * as React from "react";
import Action from "./action/Action";
import { separateClickAndMove } from "./utils/eventUtil";

import * as styles from "./index.scss";

const { Component } = React;

interface IInfo {
    imgSrc: string;
    pointerPos: { x: number, y: number };
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
            x: ev.clientX,
            y: ev.clientY,
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
                        className={styles.chartContent}
                        ref={this.canvasRef}
                    />
                </div>
            </section>
        );
    }
};

export default createChart;
