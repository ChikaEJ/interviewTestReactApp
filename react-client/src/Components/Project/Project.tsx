import styles from './Project.module.css';
import React from 'react';
import {Card} from "antd";
import {IReposInfo} from "../../Interfaces/IReposInfo";

const Project: React.FC<IReposInfo> = (props) => {
    return (
        <div >
            <Card className={styles.projectCard} title={props.name} bordered={false}>
                <h3>Owner: <a href={props.owner.html_url}>{props.owner.login}</a></h3>
                <h3>{props.visibility}</h3>
                <h3><a href={props.html_url}>Link to Repo</a></h3>
            </Card>
        </div>
    );
};

export default Project;