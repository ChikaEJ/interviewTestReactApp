import React from "react";
import {Base64} from "js-base64";
import {IRepos} from "../Interfaces/IRepos";
import {IReposInfo} from "../Interfaces/IReposInfo";
import {IUserData} from "../Interfaces/IUserData";

const sortRepos = (repos: IReposInfo[]) => {
    return repos.reduce((sortedRepos: IRepos, repo: IReposInfo) => {
        sortedRepos[repo.private ? 'Private' : 'Public'].push(repo);
        return sortedRepos;
    }, { Public: [], Private: [] });
};
export const getRepos = async (repos: IRepos | undefined, setRepos:  React.Dispatch<React.SetStateAction<IRepos | undefined>>, setIsLoading: (isLoading: boolean)=> void, login?: string) => {
    setIsLoading(true);
    const token = localStorage.getItem("accessToken");
    try {
        const url: string = "http://localhost:4000/getRepos?username=" + login;
        const authorization: string = Base64.encode(`Bearer ${token}`)
        const response: Response = await fetch(url,{
            method: "GET",
            headers: {
                Authorization: authorization
            }
        });
        const data: IReposInfo[] = await response.json();
        setRepos(sortRepos(data));
        setIsLoading(false);
    } catch (error) {
        console.error(error);
    }
};

export const getUserRepos = async (repos: IReposInfo[] | undefined, setRepos:  React.Dispatch<React.SetStateAction<IReposInfo[]>>, setIsLoading: (isLoading: boolean)=> void, login?: string) => {
    setIsLoading(true);
    try {
        const url: string = "http://localhost:4000/getUserRepos?username=" + login;
        const response: Response = await fetch(url,{
            method: "GET"
        });
        const data: IReposInfo[] = await response.json();
        setRepos(data);
        setIsLoading(false);
    } catch (error) {
        console.error(error);
    }
};


export const getUsers = async (setIsLoading: (isLoading: boolean)=> void) => {
    setIsLoading(true);
    const token = localStorage.getItem("accessToken");
    try {
        const url: string = "http://localhost:4000/getUsers"
        const authorization: string = Base64.encode(`Bearer ${token}`)
        const response: Response = await fetch(url,{
            method: "GET",
            headers: {
                Authorization: authorization
            }
        });
        const data = await response.json();
        setIsLoading(false);
        return data;
    } catch (error) {
        console.error(error);
        setIsLoading(false);
    }
};

export const getUser = async (setIsLoading: (isLoading: boolean)=> void, username: string) => {
    setIsLoading(true);
    const token = localStorage.getItem("accessToken");
    try {
        const url: string = "http://localhost:4000/getUser"
        const authorization: string = Base64.encode(`Bearer ${token}`)
        const response: Response = await fetch(url + "?username=" + username,{
            method: "GET",
            headers: {
                Authorization: authorization
            }
        });
        const data = await response.json();
        setIsLoading(false);
        return data;
    } catch (error) {
        console.error(error);
        setIsLoading(false);
    }
};

export const getUserData = async (setIsLoading: (isLoading: boolean)=> void, token: string) => {
    setIsLoading(true);
    const authorization = Base64.encode("Bearer " + token)
    const data = await (await fetch('http://localhost:4000/getUserData', {
        method: "GET",
        headers: {
            authorization: authorization
        }
    })).json();
    const userInfo = JSON.stringify(data);
    localStorage.setItem("userInfo", userInfo );
    setIsLoading(false);
}
export const changeUserInfo = (newUserInfo: IUserData)=> {
    const userDataFromLocalStore = localStorage.getItem("userInfo");
    const newUserInfoString = JSON.stringify(newUserInfo);
    if (userDataFromLocalStore && userDataFromLocalStore !== newUserInfoString) {
        localStorage.setItem("userInfo", newUserInfoString)
    }
}
export const handleCancel = (setIsModalOpen: (isOpen: boolean)=>void) => {
    setIsModalOpen(false);
};