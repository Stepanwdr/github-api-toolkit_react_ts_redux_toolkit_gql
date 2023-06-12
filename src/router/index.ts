import { lazy } from "react";
const Authorization=lazy(() => import("../pages/Authorization/Authorization"));
const Home=lazy(() => import("../pages/Home/Home"));
const RepoPage=lazy(() => import("../pages/RepoPage/RepoPage"));
export enum RoutesNames {
    AUTH = "/auth",
    REPOS= "/",
    REPO_PAGE= "/:repoOwner/:repoName",
}
export interface IRoute {
    path: string,
    Element: React.ComponentType
}
export const PrivateRoutes: IRoute[] = [
    {
        path: RoutesNames.REPOS,
        Element: Home
    },
    {
        path: RoutesNames.REPO_PAGE,
        Element: RepoPage
    }
]
export const PublicRoutes: IRoute[] = [
    {
        path: RoutesNames.AUTH,
        Element: Authorization
    }
]  