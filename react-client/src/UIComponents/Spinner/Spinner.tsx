import React from 'react';
import {Spin} from "antd";

const Spinner: React.FC<{isLoading: boolean}> = ({isLoading}) => {
    return (
        <Spin spinning={isLoading} tip="Loading" size="small">
            <div className="content"/>
        </Spin>
    );
};

export default Spinner;