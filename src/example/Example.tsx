
import * as React from "react";
import Chart from "../index";

import * as poolImage from "../../assets/images/test/reaction_pool.png";
import * as styles from "./index.scss";

interface IAppProps {
    initChart: (config: { imgRes?: string }) => React.ReactNode;
    initColumns: (config: any[]) => React.ReactNode;
}
const config = [
    {
        eles: [
            {
                entityKey: "pool1",
                imgSrc: poolImage,
                type: "POOL",
            },
            {
                entityKey: "pool2",
                imgSrc: poolImage,
                type: "POOL",
            },
            {
                entityKey: "pool3",
                imgSrc: poolImage,
                type: "POOL",
            },
        ],
        name: "池子",
    },
];
class Example extends React.Component<IAppProps> {
    public state = {
        initColumnConfig: config,
    };
    public changeConfig = () => {
        this.setState({
            initColumnConfig: [
                {
                    eles: [
                        {
                            entityKey: "pool4",
                            imgSrc: poolImage,
                            type: "POOL",
                        },
                    ],
                    name: "工艺池",
                },
                {
                    eles: [
                        {
                            imgSrc: poolImage,
                            type: "HUk",
                        },
                    ],
                    name: "工艺仪器",
                },
            ],
        });
    }
    public render(): JSX.Element {
        const { initChart, initColumns } = this.props;
        const { initColumnConfig } = this.state;
        return (
            <>
                <div className={styles.content}>
                    <div className={styles.left}>
                        {initColumns(initColumnConfig)}
                    </div>
                    <div className={styles.right}>
                        {initChart({
                            imgRes: "1080 * 300",
                        })}
                    </div>
                </div>
                <button onClick={this.changeConfig}>change config</button>
            </>
        );
    }
}

export default Chart.create({})(Example);
