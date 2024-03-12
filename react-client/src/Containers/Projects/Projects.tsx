import styles from './Projects.module.css';
import React, {useEffect, useState} from 'react';
import {Col, Row, Spin, Tabs} from "antd";
import Project from "../../Components/Project/Project";
import {getRepos} from "../../Services/Services";
import {IRepos} from "../../Interfaces/IRepos";
import Spinner from "../../Components/Spinner/Spinner";
import MyTabs from "../../Components/Tabs/MyTabs";

const Projects = () => {
    const [reposData, setReposData] = useState<IRepos>();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        getRepos(reposData, setReposData, setIsLoading);
    }, []);

    return (
        <div className={"container " + styles.tabsWrapper}>
            <h1>My Projects</h1>
            <Spinner isLoading={isLoading} />
            <MyTabs reposData={reposData} getRepos={getRepos} />
        </div>
    );
};

export default Projects;
