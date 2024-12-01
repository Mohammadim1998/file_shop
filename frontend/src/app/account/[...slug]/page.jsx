import AccountMain from "@/components/Account/AccountMain";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getAuthData = async (cookieValue) => {
    const data = await fetch("https://file-server.liara.run/api/get-user-data", { cache: "no-store", headers: { auth_cookie: cookieValue } });
    return data.json();
}

const page = async ({params}) => {
    const cookieStore = cookies();
    const auth_cookie = cookieStore.get("auth_cookie");
    const cookieValue = auth_cookie?.value;
    const data = await getAuthData(cookieValue);
    
    if (!data._id) {
        redirect("/login");
    }

    return (
        <div className="container mx-auto flex justify-center items-center">
            {/* <div className="px-8 py-4 rounded-md bg-orange-500 text-white">حساب کاربری</div> */}
            <AccountMain items={params} />
        </div>
    );
}

export default page;