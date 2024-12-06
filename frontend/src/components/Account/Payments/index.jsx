"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Image from "next/image";
import { FiRefreshCw } from "react-icons/fi";
import SlideBox from "@/components/Sliders/Graphic-slider-box";

const Payments = ({ cookie }) => {
    const [data, setData] = useState([-1]);
    const [needRefresh, setNeedRefresh] = useState(0);

    //PRICE BEAUTIFUL
    function priceChanger(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    useEffect(() => {
        if (cookie && cookie.length > 0) {
            axios.get("https://file-server.liara.run/api/get-part-of-user-data/payments", { headers: { auth_cookie: cookie } })
                .then(d => {
                    setData(d.data);
                    console.log("d.Payments ===>>>", d.data);
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
            <h3 className="absolute top-1 ring-1 text-lg">سفارش های من</h3>

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
                                <div className="rounded-md flex justify-center items-center bg-orange-600 w-20 h-10 text-white">{data.length} سفارش</div>
                            </div>

                            <div>
                                {data.length < 1}
                                ? <div className="w-full flex justify-center items-center p-8">سفارشی موجود نیست...</div>
                                :(<div className="w-full flex flex-col gap-8">
                                    {data.map((da, i) => (
                                        <div
                                            className="w-full flex flex-col gap-4 bg-zinc-200 text-sm h-10 rounded-md p-4 relative"
                                            key={i}
                                        >

                                            <div className="flex justify-between items-start gap-4 w-full">
                                                <div className="flex justify-center items-center w-20 h-8 rounded bg-zinc-300">
                                                    {priceChanger(da.amount / 10)} تومان
                                                </div>

                                                <div className="flex justify-center items-center w-40 h-8 rounded bg-zinc-300">
                                                    تاریخ: {da.createdAt}
                                                </div>
                                                {da.payed == true
                                                    ? (<div className="flex justify-center items-center w-20 h-8 rounded text-white bg-green-600">پرداخت شد</div>)
                                                    : (<div onClick={() => { window.location.assign(`https://www.zarinpal.com/pg/StartPay/${da.resnumber}`) }} className="cursor-pointer flex justify-center items-center w-60 h-8 rounded text-white bg-rose-600">در انتضار پرداخت (الان پرداخت میکنم)</div>)
                                                }
                                            </div>

                                            <div className="flex justify-between items-center gap-2 flex-wrap">
                                                {da.products.map((da, i) => (
                                                    <SlideBox itemData={da} key={i} />
                                                ))}
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

export default Payments;