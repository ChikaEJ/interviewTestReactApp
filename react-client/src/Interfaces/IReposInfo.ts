export interface IReposInfo{
    name?: string;
    owner: {html_url: string, login: string};
    html_url: string;
    private?: boolean;
    visibility: string;
}