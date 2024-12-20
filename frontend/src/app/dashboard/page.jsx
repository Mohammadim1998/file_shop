import MainDashboard from "@/components/dashboard/mainDashboard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NotFound from "../not-found";

const getAuthData = async (cookieValue) => {
    const goalData = await fetch("https://file-server.liara.run/api/get-user-admin-data", { cache: "no-store", headers: { auth_cookie: cookieValue } });
    const data = await goalData.json();
    if (!data._id) {
        NotFound();
    } else {
        return data;
    }
}

const page = async () => {
    const cookieStore = cookies();
    const auth_cookie = cookieStore.get("auth_cookie");
    if(!auth_cookie || auth_cookie.length < 10) {
        NotFound();
    }
    const cookieValue = (auth_cookie && auth_cookie.value) ? auth_cookie.value : undefined;
    const data = await getAuthData(cookieValue);

    return (
        <div>
             <>
                <title>داشبورد مدیریتی</title>
                <meta name="description" content={"داشبورد مدیریتی"} />
                <meta name="robots" content="noindex, nofollow" />
                <link rel="canonical" href={"http://localhost:3000/dashboard"} />
            </>

            <MainDashboard />
        </div>
    );
}

export default page;