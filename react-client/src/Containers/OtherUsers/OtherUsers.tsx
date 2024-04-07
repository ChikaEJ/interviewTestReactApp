import styles from "./OtherUsers.module.css"
import React, {useEffect, useState} from 'react';
import {getUser, getUserRepos, handleCancel} from "../../Services/Services";
import Spinner from "../../UIComponents/Spinner/Spinner";
import {Input, Modal} from "antd";
import {IReposInfo} from "../../Interfaces/IReposInfo";
import ListDisplayRepos from "../../UIComponents/ListDisplayRepos/ListDisplayRepos";
import {IUserItem} from "../../Interfaces/IUserItem";
import ListDisplayUsers from "../../UIComponents/ListDisplayUsers/LIstDisplayUsers";


const OtherUsers = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [searchName, setSearchName] = useState<string>('')
    const [users, setUsers] = useState<IUserItem[]>([])
    const [reposData, setReposData] = useState<IReposInfo[]>([{
        visibility: '',
        owner: {login: '', html_url: ''},
        private: false,
        name: '',
        html_url: ''
    }]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
            try {
                getUser(setIsLoading, searchName).then(users => setUsers(prevState => {
                    if(Array.isArray(users)){
                        return users;
                    }else {
                        return [users];
                    }

                }));
            } catch (e){
                console.log(e)
            }
    }, [searchName]);

    const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
        if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - 400) <= 1) {
            getUser(setIsLoading, '').then(users => setUsers(users));
        }
    };
    const clickHandler = async (login: string) => {
        try {
            setIsModalOpen(true)
            await getUserRepos(setReposData, setIsLoading, login);
        } catch (e) {
            console.error(e)
        }
    }
    return (
        <section className={styles.main + " container"}>
            <Spinner isLoading={isLoading}/>
            <div>
                <Input placeholder="Type username" onChange={(e) => setSearchName(e.target.value)}/>
            </div>
            <div key={"f"}>
                <ListDisplayUsers users={users} clickHandler={clickHandler} onScroll={onScroll}/>
            </div>
            <Modal title={`Public repositories`} open={isModalOpen} onCancel={() => handleCancel(setIsModalOpen)}
                   footer={null}>
                <ListDisplayRepos data={reposData}/>
            </Modal>
        </section>
    );
};

export default OtherUsers;