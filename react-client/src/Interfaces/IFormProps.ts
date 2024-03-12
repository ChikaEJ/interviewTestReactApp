import {IUserData} from "./IUserData";
import React from "react";

export interface IFormProps {
    onFinish: ()=> void;
    data: IUserData;
    setData:  React.Dispatch<React.SetStateAction<IUserData>>;
}