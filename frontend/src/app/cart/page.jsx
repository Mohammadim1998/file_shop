import CartPageCom from "@/components/CartPageCom";
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


const page = async () => {
    const cookieStore = cookies();
    const auth_cookie = cookieStore.get("auth_cookie");
    const cookieValue = auth_cookie?.value;
    const data = await getAuthData(cookieValue);

    return (
        <main className="container mx-auto">
            <>
                <title>سبد خرید</title>
                <meta name="description" content={"سبد خرید"} />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={"http://localhost:3000/cart"} />
            </>

            <CartPageCom cookie={cookieValue} />
        </main>
    );
}

export default page;