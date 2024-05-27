'use server'

import { cookies } from 'next/headers'



const saveCookie = async function create(token: string) {
    cookies().set('token', token)
}



export default saveCookie;

