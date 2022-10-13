import { fetchUser } from "../utils/fetchLocStorageData"

const userInfo = fetchUser()

export const initialState = {
    user : userInfo,
}