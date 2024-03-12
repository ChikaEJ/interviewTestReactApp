import styles from "./OtherUsers.module.css"

import React, {useEffect, useState} from 'react';
import {getUser, getUserRepos, getUsers, handleCancel} from "../../Services/Services";
import Spinner from "../../Components/Spinner/Spinner";
import {Input, Modal} from "antd";
import {IReposInfo} from "../../Interfaces/IReposInfo";
import ListDisplayRepos from "../../Components/ListDisplayRepos/ListDisplayRepos";
import {IUserItem} from "../../Interfaces/IUserItem";
import ListDisplayUsers from "../../Components/ListDisplayUsers/LIstDisplayUsers";



const OtherUsers = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState<IUserItem[]>([{email: '', login: '', avatar_url: "", html_url: '', node_id: '', repos_url: ''}])
    const [reposData, setReposData] = useState<IReposInfo[]>([{visibility: '', owner: {login: '', html_url: ''}, private: false, name: '', html_url: ''}]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
       getUsers(setIsLoading).then(setUsers);
    }, []);
    const inputHandler = (e: any) => {
        const value= e.target.value;
        getUser(setIsLoading, value).then(user => setUsers(prevState => [user]));
    }
    const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
        if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - 400) <= 1) {
            getUsers(setIsLoading).then(users => setUsers(users));
        }
    };
    const clickHandler = async (login: string) => {
        try {
            setIsModalOpen(true)
            await getUserRepos(reposData, setReposData, setIsLoading, login);
        }catch (e) {
            console.error(e)
        }
    }
    return (
        <section className={styles.main + " container"}>
            <Spinner isLoading={isLoading} />
            <div>
                <Input placeholder="Type username" onPressEnter={(e)=>inputHandler(e)} />
            </div>
            <div>
                <ListDisplayUsers users={users} clickHandler={clickHandler} onScroll={onScroll} />
            </div>
            <Modal title={`Public repositories`}  open={isModalOpen} onCancel={()=>handleCancel(setIsModalOpen)} footer={null}>
                <ListDisplayRepos data={reposData} />
            </Modal>
        </section>
    );
};

export default OtherUsers;