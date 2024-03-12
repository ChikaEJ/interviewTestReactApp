import React from 'react';
import VirtualList from "rc-virtual-list";
import {IUserItem} from "../../Interfaces/IUserItem";
import {Avatar, List} from "antd";
interface IListDisplayUsersProps{
    users: IUserItem[];
    clickHandler: (login: string)=>void;
    onScroll: (e: React.UIEvent<HTMLElement, UIEvent>)=>void;
}
const ListDisplayUsers: React.FC<IListDisplayUsersProps> = ({users, clickHandler, onScroll}) => {
    return (
        <div>
            <List>
                <VirtualList
                    data={users}
                    height={400}
                    itemHeight={47}
                    itemKey="node_id"
                    onScroll={onScroll}
                >
                    {(item: IUserItem) => (
                        <List.Item key={item.node_id}>
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar_url} />}
                                title={<a href={item.html_url}>{item.login}</a>}
                                description={item.email}
                            />
                            <div><button onClick={()=>clickHandler(item.login)}>Get repos</button></div>
                        </List.Item>
                    )}
                </VirtualList>
            </List>
        </div>
    );
};

export default ListDisplayUsers;