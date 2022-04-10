import React from "react";
import { COLORS } from "../../../common";
import AlertView, { AlertViewProps } from "./AlertView";

const Success = (props: AlertViewProps) => (
    <AlertView  {...props} icon={require('./assets/short_right.png')} color={COLORS.LIGHT_GREEN} />
)

export default Success