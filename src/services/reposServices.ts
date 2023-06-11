import { client } from "../graphql";
import { SEARCH_REPOSITORIES, GET_REPOSITORY } from "../graphql/repos";
import { IRepo } from "../model/IRepo";
import { ISearch } from "../model/ISearch";

export class reposServices {
  static async fetchSearchRepos(searchData: ISearch): Promise<any> {
    const { query, after, before, first, last } = searchData
    try {
      const res = await client.query<IRepo[]>({
        query: SEARCH_REPOSITORIES,
        variables: {
          query: query,
          first: first || undefined,
          after: after || undefined,
          before: before || undefined,
          last: last || undefined,
        }
      })
      if (!res || !res.data) {
        throw new Error('Something went wrong!')
      }
      return res.data
    } catch (e) {
      throw (e)
    }
  }
  static async fetchReposInfo(owner: string, repoName: string):Promise<any> {
    try {
      const res = await client.query<IRepo>({
        query: GET_REPOSITORY,
        variables: {
          owner,
          name: repoName
        }
      })
      if (!res || !res.data) {
        throw new Error('Something went wrong!')
      }
      return res.data
    } catch (e) {
      throw (e)
    }
  }
}