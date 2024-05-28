'use server'
import { redirect } from "next/navigation";


const redirector = async function (path: string) {
    redirect("path");
}

export default redirector;