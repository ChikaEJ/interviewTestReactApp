import styles from "./UserInfo.module.css";
import React, {useCallback, useState} from 'react';
import {IUserData} from "../../Interfaces/IUserData";
import {Button, Modal} from "antd";
import FormEditUserInfo from "../Form/FormEditUserInfo";
import {changeUserInfo, handleCancel} from "../../Services/Services";

const UserInfo: React.FC<IUserData> = () => {
    const userDataFromLocalStore = JSON.parse(localStorage.getItem("userInfo") || "{}")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userInfo, setUserInfo] = useState<IUserData>(userDataFromLocalStore);

    const editButton = useCallback((event: React.MouseEvent<HTMLSpanElement>) => {
        setIsModalOpen(true);
    }, []);
    const onFinish = () => {
        changeUserInfo(userInfo);
        setIsModalOpen(false);

    }

    return (
        <div className={"container " + styles.mainInfo}>
            <div className={styles.name}>
                <h1>{userInfo.name}</h1></div>
            <div className={styles.userInfo}>
                <div className={styles.imgBlock}><img width={200} src={userInfo.avatar_url} alt="userPic"/>
                </div>
                <div className={styles.userInfoText}>
                    <Button className={styles.editButton} onClick={editButton} type={"text"}>Edit</Button>
                    <div className={styles.userInfoItem}><span>Login:</span>
                        <div className={styles.textInfoData}>{userInfo.login}</div>
                    </div>
                    <div className={styles.userInfoItem}><span>Email:</span>
                        <div className={styles.textInfoData}>{userInfo.email}</div>
                    </div>
                    <div className={styles.userInfoItem}><span>Company:</span>
                        <div className={styles.textInfoData}>{userInfo.company}</div>
                    </div>
                    <div className={styles.userInfoItem}><span>Bio:</span> <span
                        className={styles.textInfoData}>{userInfo.bio}</span>
                    </div>
                    <div className={styles.userInfoItem}><a href={userInfo.html_url}>Link to profile</a></div>
                    <div className={styles.userInfoItem}><span>Location:</span>
                        <div className={styles.textInfoData}>{userInfo.location}</div>
                    </div>
                    <Modal title="Edit Personal Informaion" open={isModalOpen} onCancel={()=>handleCancel(setIsModalOpen)} footer={null}>
                        <FormEditUserInfo onFinish={onFinish} data={userInfo} setData={setUserInfo}/>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;