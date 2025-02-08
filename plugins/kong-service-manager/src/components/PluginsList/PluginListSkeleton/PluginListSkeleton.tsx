import React from "react";
import { Content } from "@backstage/core-components"
import { usePluginListSkeletonStyles } from "./styles"
import { Skeleton } from "@material-ui/lab";

export const PluginListSkeleton = () => {
    const { content, gridCard, titleBar,title, card } = usePluginListSkeletonStyles();

    return (
       <Content className={content}>
        <div className={titleBar}>
          <Skeleton variant="rect" animation="wave" width="200px" height="32px" className={title}/>
        </div>
        <div className={gridCard}>
          <Skeleton variant="rect" animation="wave" width="369px" height="352px" className={card}/>
          <Skeleton variant="rect" animation="wave" width="369px" height="352px" className={card}/>
          <Skeleton variant="rect" animation="wave" width="369px" height="352px" className={card}/>
          <Skeleton variant="rect" animation="wave" width="369px" height="352px" className={card}/>
          <Skeleton variant="rect" animation="wave" width="369px" height="352px" className={card}/>
          <Skeleton variant="rect" animation="wave" width="369px" height="352px" className={card}/>
        </div>
       </Content>
    )
}