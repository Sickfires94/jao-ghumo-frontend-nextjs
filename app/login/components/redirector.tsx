'use server'
import { redirect } from "next/navigation";


const redirector = async function () {
    redirect("../");
}

export default redirector;