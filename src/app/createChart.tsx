import * as React from "react";

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
        console.log(extractInfo.imgSrc);
    }

    public render(): JSX.Element {
        return (
            <section
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
