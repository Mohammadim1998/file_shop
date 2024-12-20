"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Info from "../Info";
import Favorites from "../Favorites";
import Files from "../Files";
import Comments from "../Comments";
import Payments from "../Payments";
import axios from "axios";

const goTopCtrl = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

const AccountMain = ({ items }) => {
    const [auth_cookie, setAuth_cookie] = useState(Cookies.get("auth_cookie"));
    const [auth_cookie2, setAuth_cookie2] = useState(Cookies.get("auth_cookie"));
    const router = useRouter();

    useEffect(() => {
        if (auth_cookie != auth_cookie2) {
            router.push("/login");
        } else if (!auth_cookie || auth_cookie2 == "") {
            router.push("/login");
        } else {
            axios.get("https://file-server.liara.run/api/get-user-data", { headers: { auth_cookie: auth_cookie } })
                .then(d => {
                    if (!d.data._id) {
                        router.push("/login")
                    }
                })
                .catch(e => { router.push("/login") })
        }
    }, [Cookies.get("auth_cookie")]);

    useEffect(() => {
        setAuth_cookie2(Cookies.get("auth_cookie"));
    }, [Cookies.get("auth_cookie")]);

    //TAB
    const [details, setDetails] = useState(<Info cookie={auth_cookie} />);
    useEffect(() => {
        if (items.slug[0] == "info") {
            setDetails(<Info cookie={auth_cookie} />)
        } else if (items.slug[0] == "favorites") {
            setDetails(<Favorites cookie={auth_cookie} />)
        } else if (items.slug[0] == "files") {
            setDetails(<Files cookie={auth_cookie} />)
        } else if (items.slug[0] == "comments") {
            setDetails(<Comments cookie={auth_cookie} />)
        } else if (items.slug[0] == "payments") {
            setDetails(<Payments cookie={auth_cookie} />)
        }
    }, [items.slug[0]]);

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center gap-2">
                <div className="w-72 min-w-72 bg-zinc-100 p-6 rounded-md sticky top-8 right-0 bottom-8">
                    <nav className="flex justify-center items-center">
                        <ul className="w-full flex flex-col gap-4">
                            <li>
                                <Link onClick={goTopCtrl} href={"/account/info"}
                                    className={items.slug[0] == "info"
                                        ? "rounded-md text-white bg-indigo-500 transition-all duration-500 hover:bg-indigo-600 flex justify-center items-center w-full h-12"
                                        : "rounded-md text-white bg-orange-500 transition-all duration-500 hover:bg-indigo-600 flex justify-center items-center w-full h-12"
                                    }
                                >اطلاعات</Link>
                            </li>
                            <li>
                                <Link onClick={goTopCtrl} href={"/account/favorites"}
                                    className={items.slug[0] == "favorites"
                                        ? "rounded-md text-white bg-indigo-500 transition-all duration-500 hover:bg-indigo-600 flex justify-center items-center w-full h-12"
                                        : "rounded-md text-white bg-orange-500 transition-all duration-500 hover:bg-indigo-600 flex justify-center items-center w-full h-12"
                                    }
                                >مورد علاقه ها</Link>
                            </li>
                            <li>
                                <Link onClick={goTopCtrl} href={"/account/files"}
                                    className={items.slug[0] == "files"
                                        ? "rounded-md text-white bg-indigo-500 transition-all duration-500 hover:bg-indigo-600 flex justify-center items-center w-full h-12"
                                        : "rounded-md text-white bg-orange-500 transition-all duration-500 hover:bg-indigo-600 flex justify-center items-center w-full h-12"
                                    }
                                >فایل ها</Link>
                            </li>
                            <li>
                                <Link onClick={goTopCtrl} href={"/account/comments"}
                                    className={items.slug[0] == "comments"
                                        ? "rounded-md text-white bg-indigo-500 transition-all duration-500 hover:bg-indigo-600 flex justify-center items-center w-full h-12"
                                        : "rounded-md text-white bg-orange-500 transition-all duration-500 hover:bg-indigo-600 flex justify-center items-center w-full h-12"
                                    }
                                >دیدگاه ها</Link>
                            </li>
                            <li>
                                <Link onClick={goTopCtrl} href={"/account/payments"}
                                    className={items.slug[0] == "payments"
                                        ? "rounded-md text-white bg-indigo-500 transition-all duration-500 hover:bg-indigo-600 flex justify-center items-center w-full h-12"
                                        : "rounded-md text-white bg-orange-500 transition-all duration-500 hover:bg-indigo-600 flex justify-center items-center w-full h-12"
                                    }
                                >سفارش ها</Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="w-full p-4 bg-zinc-100 rounded-md">{details}</div>
            </div>
        </div>
    );
}

export default AccountMain;