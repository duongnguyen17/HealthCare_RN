import React from "react";
import { COLORS } from "../../../common";
import AlertView, { AlertViewProps } from "./AlertView";

const Warning = (props: AlertViewProps) => (
    <AlertView  {...props} icon={require('./assets/short_right1.png')} color={COLORS.LIGHT_ORANGE} />
)

export default Warning