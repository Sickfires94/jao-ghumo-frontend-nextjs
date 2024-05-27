'use server'

import { cookies } from 'next/headers'



const getCookie = async () => {
    const cookieStore = cookies()
    const token = cookieStore.get('token')
    return token
}



export default getCookie;