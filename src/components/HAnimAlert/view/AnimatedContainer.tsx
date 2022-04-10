import React, { ReactChildren } from 'react'


export interface AnimatedContainerProps {
    children: ReactChildren;
    isVisible: boolean;
    onHide: () => void;
};