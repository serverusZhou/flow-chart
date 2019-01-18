import * as React from "react";

import Action from "./action/Action";

import * as styles from "./index.scss";

const { Component } = React;

interface IInfo {
    imgSrc: string;
}

const createChart = (config: any) =>
class extends Component {

    public grapDrop(
        ev: React.DragEvent<HTMLDivElement>,
    ): void {
        const receivedMsg: string = ev.dataTransfer.getData("eleMsg");
        const extractInfo: IInfo = JSON.parse(receivedMsg);
        const action = new Action();
        action.addEle(extractInfo);
    }

    public componentWillUnmount() {
        console.log("do some will unmount thing!!");
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
                <canvas style={{ width: "100%", height: "100%" }}/>
            </section>
        );
    }
};

export default createChart;
