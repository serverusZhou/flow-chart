import * as React from "react";
import Action from "./action/Action";

import * as styles from "./index.scss";

const { Component } = React;

interface IInfo {
    imgSrc: string;
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
        const receivedMsg: string = ev.dataTransfer.getData("eleMsg");
        const extractInfo: IInfo = JSON.parse(receivedMsg);
        Action.addEle(extractInfo);
    }

    public componentWillUnmount() {
        console.log("do some will unmount thing!!");
    }

    public componentDidMount() {
        this.init();
    }

    public init() {

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
            <section
                className={styles.chartContext}
                draggable={false}
                onDrop={this.grapDrop}
                onDragOver={
                    (ev: React.DragEvent<HTMLDivElement>) =>
                    ev.preventDefault()
                }
            >
                <header className={styles.chartBar}>
                    this is the little bar
                </header>
                <canvas className={styles.chartContent} ref={this.canvasRef} />
            </section>
        );
    }
};

export default createChart;
