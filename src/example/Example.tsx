
import * as React from "react";
import Chart from "../index";

import * as poolImage from "../../assets/images/test/reaction_pool.png";
import * as styles from "./index.scss";

interface IAppProps {
    initChart: () => React.ReactNode;
    initColumns: (config: any[]) => React.ReactNode;
}
const initColumnConfig = [
    {
        eles: [
            {
                imgSrc: poolImage,
                type: "POOL",
            },
            {
                imgSrc: poolImage,
                type: "POOL",
            },
            {
                imgSrc: poolImage,
                type: "POOL",
            },
            {
                imgSrc: poolImage,
                type: "POOL",
            },
            {
                imgSrc: poolImage,
                type: "POOL",
            },
            {
                imgSrc: poolImage,
                type: "POOL",
            },
        ],
        name: "池子",
    },
];
class Example extends React.Component<IAppProps> {
    public render(): JSX.Element {
        const { initChart, initColumns } = this.props;
        return (
            <div className={styles.content}>
                <div className={styles.left}>
                    {initColumns(initColumnConfig)}
                </div>
                <div className={styles.right}>
                    {initChart()}
                </div>
            </div>
        );
    }
}

export default Chart.create({})(Example);
