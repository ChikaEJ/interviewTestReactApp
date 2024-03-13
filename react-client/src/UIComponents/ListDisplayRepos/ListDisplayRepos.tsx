import React from 'react';
import {List} from "antd";
import {IReposInfo} from "../../Interfaces/IReposInfo";
interface IListDisplay {
    data: IReposInfo[]
}
const ListDisplayRepos: React.FC<IListDisplay> = ({data}) => {
    return (
        <div>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(repo: IReposInfo, index: number) => (
                    <List.Item>
                        <List.Item.Meta
                            key={repo.name}
                            title={<a href={repo.html_url}>{repo.name}</a>}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default ListDisplayRepos;