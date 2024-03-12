import React from 'react';
import styles from "../../Containers/Projects/Projects.module.css";
import {Col, Row, Tabs} from "antd";
import Project from "../Project/Project";
import {IReposInfo} from "../../Interfaces/IReposInfo";
import {IRepos} from "../../Interfaces/IRepos";
interface ITabsProps{
    reposData: IRepos | undefined;
    getRepos: (repos: IRepos | undefined, setRepos: React.Dispatch<React.SetStateAction<IRepos | undefined>>, setIsLoading: (isLoading: boolean) => void) => void;
}
const MyTabs: React.FC<ITabsProps> = ({reposData, getRepos}) => {
    return (
        <div>
            <Tabs
                className={styles.tabs}
                defaultActiveKey="1"
                type="card"
                onTabClick={() => getRepos}
                size={"large"}
                items={[{title: "Public", repos: reposData?.Public}, {
                    title: "Private",
                    repos: reposData?.Private
                }].map((data) => ({
                    label: data.title,
                    key: data.title,
                    children: (
                        <Row gutter={16}>
                            {data.repos ?
                                data.repos.map((project: IReposInfo, i: number) => (
                                    <Col span={8} key={i}>
                                        <Project {...project} />
                                    </Col>
                                ))
                                :
                                []
                            }
                        </Row>
                    ),
                }))}
            />
        </div>
    );
};

export default MyTabs;