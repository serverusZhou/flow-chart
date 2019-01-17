import * as React from "react";

import createChart from "./createChart";
import createColumns from "./createColumns";

const create = (createConfig: any) => {
    console.log("createConfigcreateConfig", createConfig);
    return (WrappedComponent: any) => {
        return class extends React.Component {
            public createChart = (config: any) => {
                const Chart =  createChart(config);
                return <Chart />;
            }
            public createColumns = (config: Array<{
                name: string;
                eles: Array<{
                    imgSrc: string,
                    type: string,
                }>;
            }>) => {
                const Columns = createColumns(config);
                return <Columns />;
            }
            public render(): JSX.Element {
                return (
                    <>
                    <WrappedComponent
                        {...this.props}
                        initChart = {this.createChart}
                        initColumns = {this.createColumns}
                    />
                    </>
                );
            }
        };
    };
};

export default create;
