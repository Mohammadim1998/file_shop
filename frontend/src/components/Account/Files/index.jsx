"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Image from "next/image";
import { FiRefreshCw } from "react-icons/fi";
import Link from "next/link";

const Files = ({ cookie }) => {
    const [data, setData] = useState([-1]);
    const [needRefresh, setNeedRefresh] = useState(0);

    useEffect(() => {
        if (cookie && cookie.length > 0) {
            axios.get("https://file-server.liara.run/api/get-part-of-user-data/files", { headers: { auth_cookie: cookie } })
                .then(d => {
                    setData(d.data);
                    console.log("d.Files ===>>>", d.data);
                    setNeedRefresh(1);
                })
                .catch(e => {
                    toast.error("خطا در لود اطلاعات", {
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
        }
    }, [cookie, needRefresh]);

    return (
        <div className="relative flex flex-col gap-8 p-20">
            <h3 className="absolute top-1 ring-1 text-lg">فایل های من</h3>

            <div onClick={() => {
                setNeedRefresh(1);
                setData([-1]);
            }} className="absolute top-1 left-1 cursor-pointer text-white bg-indigo-500 rounded flex text-sm justify-center items-center gap-1 w-24 h-10">
                <FiRefreshCw />به روزرسانی
            </div>
            <div>
                {data[0] == -1
                    ? (<div className="flex justify-center items-center p-12">
                        <Image alt="loading" width={120} height={120} src={"/loading.svg"} />
                    </div>)
                    : (
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-end items-center w-full">
                                <div className="rounded-md flex justify-center items-center bg-orange-600 w-20 h-12 text-white">{data.length} فایل</div>
                            </div>

                            <div>
                                {data.length < 1}
                                ? <div className="w-full flex justify-center items-center p-8">فایلی موجود نیست...</div>
                                :(<div className="w-full flex flex-col gap-8">
                                    {data.map((da, i) => (
                                        <div key={i} className="w-full flex flex-col gap-4 bg-zinc-200 text-sm h-10 rounded-md p-4 relative">
                                            <div className="flex justify-between items-start gap-4">
                                                <div className="flex justify-center items-center pt-2">
                                                    <Image
                                                        width={270}
                                                        height={150}
                                                        className="rounded-md"
                                                        src={da.image}
                                                        alt={da.imageAlt}
                                                    />
                                                </div>

                                                <div className="relative w-full h-[140px] flex flex-col justify-between gap-4">
                                                    <Link
                                                        href={`/shop/${da.slug}`}
                                                        target={"_blank"}
                                                        className="absolute top-1 left-1 rounded-sm flex justify-center items-center text-xs w-20 h-6 bg-green-600 text-white transition-all duration-300 hover:bg-green-600 pt-2"
                                                    >
                                                        لینک محصول
                                                    </Link>
                                                    <h4 className="text-base">{da.title}</h4>
                                                    <Link
                                                        href={da.mainFile}
                                                        target={"_blank"}
                                                        className="rounded-md flex justify-center items-center text-sm bg-sky-600 text-white transition-all duration-300 hover:bg-sky-700 py-3 px-4"
                                                    >
                                                        دانلود فایل محصول
                                                    </Link>
                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                </div>)
                            </div>
                        </div>
                    )}
            </div>

            <ToastContainer
                bodyClassName={() => "font-[shabnam] text-sm flex items-center"}
                position="top-right"
                autoClose={3000}
                theme="colored"
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default Files;