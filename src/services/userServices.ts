import { client } from "../graphql";
import { GET_CURRENT_USER } from "../graphql/user";
export class userServices {
  static async fetchGetUser(): Promise<any> {

    try {
      const res = await client.query({
        query: GET_CURRENT_USER,
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
