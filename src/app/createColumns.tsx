import * as React from "react";

import * as styles from "./index.scss";

const { Component } = React;

const createColumns = (configs: Array<{
    name: string;
    eles: Array<{
        imgSrc: string,
        type: string,
    }>;
}>) => {
    return class extends Component {
        public dragStart(
            ev: React.DragEvent<HTMLImageElement>,
            ele: object,
        ): void  {
            ev.dataTransfer.setData("eleMsg", JSON.stringify(ele));
        }
        public render(): JSX.Element {
            return (
                <>
                    {
                        configs.map((config, index) => (
                            <section key={index}>
                                <h3 className={styles.elesH3}>{config.name}</h3>
                                <ul className={styles.elesUl}>
                                    {
                                        config.eles.map((ele, eleIndex) => (
                                            <li key={eleIndex}>
                                                <img
                                                    draggable
                                                    src={ele.imgSrc}
                                                    onDragStart={
                                                        (ev) =>
                                                        this.dragStart(ev, ele)
                                                    }
                                                />
                                            </li>
                                        ))
                                    }
                                </ul>
                            </section>
                        ))
                    }
                </>
            );
        }
    };
};

export default createColumns;
