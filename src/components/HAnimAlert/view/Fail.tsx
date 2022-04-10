import React from "react";
import { COLORS } from "../../../common";
import AlertView, { AlertViewProps } from "./AlertView";

const Fail = (props: AlertViewProps) => (
    <AlertView  {...props} icon={require('./assets/short_down.png')} color={COLORS.ERROR_COLOR} />
)

export default Fail