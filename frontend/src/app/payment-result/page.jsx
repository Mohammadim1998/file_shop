import PaymentResultcom from "@/components/PaymentResultcom";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getAuthData = async (cookieValue) => {
    const goalData = await fetch("https://file-server.liara.run/api/get-user-data", { cache: "no-store", headers: { auth_cookie: cookieValue } });
    const data = await goalData.json();
    if (!data._id) {
        redirect("/login")
    } else {
        return data;
    }
}

const page = async ({searchParams}) => {
    const cookieStore = cookies();
    const auth_cookie = cookieStore.get("auth_cookie");
    const cookieValue = auth_cookie?.value;
    const data = await getAuthData(cookieValue);

    return (
        <section className="container mx-auto p-12 flex justify-center items-center">
            <PaymentResultcom searchParams={searchParams} cookie={cookieValue} />
        </section>
    );
}

export default page;