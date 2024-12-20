"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Image from "next/image";
import { FiRefreshCw } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from "next/link";
//USING CONTEXT
import { useAppContext } from "../../../../context/appContext";

const Favorites = ({ cookie }) => {
    const [data, setData] = useState([-1]);
    const [needRefresh, setNeedRefresh] = useState(0);

    //CONTEXT OF CART NUMBER
    const { cartNumber, setCartNumber } = useAppContext();

    const spliterForFeatures = (value) => {
        return value.split(":");
    }

    //PRICE BEAUTIFUL
    function priceChanger(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    useEffect(() => {
        if (cookie && cookie.length > 0) {
            axios.get("https://file-server.liara.run/api/get-part-of-user-data/favorite", { headers: { auth_cookie: cookie } })
                .then(d => {
                    setData(d.data);
                    console.log("d.Favorites ===>>>", d.data);
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

    const productRemover = (input) => {
        const formData = {
            method: "remove",
            goalFavProductId: input
        }

        axios.post("https://file-server.liara.run/api/favorite-product/", formData,
            { headers: { auth_cookie: cookie } })
            .then((d) => {
                toast.success(d.data.msg, {
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                setNeedRefresh(1)
            })
            .catch((err) => {
                const errorMsg = (err.response && err.response.data && err.response.data.msg) ? err.response.data.msg : "خطا"
                toast.error(errorMsg, {
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            })
    };

    //User cart Products
    const cartAdder = (input) => {
        const productData = {
            method: "push",
            newCartProduct: input,
        };
        const backendUrl = `https://file-server.liara.run/api/cart-managment`;
        axios.post(backendUrl, productData, { headers: { auth_cookie: cookie } })
            .then((d) => {
                console.log(d.data);
                Cookies.set('auth_cookie', d.data.auth, { expires: 60 });
                const message = d.data.msg ? d.data.msg : "با موفقیت به سبد خرید افزوده شد"
                toast.success(message, {
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                // setBulkEmailSituation(input)
                setCartNumber(cartNumber + 1);
            })
            .catch((err) => {
                const errorMsg = (err.response && err.response.data && err.response.data.msg) ? err.response.data.msg : "خطا"
                toast.error(errorMsg, {
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            })
    }

    return (
        <div className="relative flex flex-col gap-8 p-20">
            <>
                <meta charset="utf-8" />
                <title>محصولات مورد علاقه من</title>
                <meta name="description" content="محصولات مورد علاقه من" />
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="shortcut icon" href="/favicon2.ico" type="image/x-icon" />
                <link rel="canonical" href="https://localhost:3000/account/favorite" />
            </>
            <h3 className="absolute top-1 ring-1 text-lg">محصولات مورد علاقه من</h3>

            <div onClick={() => {
                setData([-1]);
                setNeedRefresh(1);
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
                                <div className="rounded-md flex justify-center items-center bg-orange-600 w-20 h-10 text-white">{data.length} محصول</div>
                            </div>

                            <div>
                                <div>
                                    {data.length < 1
                                        ? <div className="w-full flex justify-center items-center p-8">محصولی موجود نیست...</div>
                                        : (<div className="w-full flex flex-col gap-8">
                                            {data.map((da, i) => (
                                                <div key={i} className="w-full flex flex-col gap-4 bg-zinc-200 text-sm rounded-md p-4 relative">
                                                    <div className="flex justify-between items-start gap-4">
                                                        <div className="flex justify-center items-center pt-2">
                                                            <Image
                                                                width={270}
                                                                height={150}
                                                                className="rounded-md"
                                                                src={da.image}
                                                                alt={"محصول مورد علاقه"}
                                                            />
                                                        </div>

                                                        <div className="w-full flex flex-col gap-4">
                                                            <Link
                                                                href={`/shop/${da.slug}`}
                                                                target={"_blank"}
                                                                className="absolute top-1 left-1 rounded-sm flex justify-center items-center text-xs w-20 h-6 bg-green-600 text-white transition-all duration-300 hover:bg-green-600 pt-2"
                                                            >
                                                                لینک محصول
                                                            </Link>

                                                            <div className="cursor-pointer absolute top-1 left-24 bg-indigo-500 text-white rounded-sm text-xs flex justify-center items-center w-20 h-6">
                                                                {da.typeOfProduct == "gr" ? (
                                                                    <div>فایل گرافیکی</div>
                                                                ) : da.typeOfProduct == "app" ? (
                                                                    <div>اپلیکیشن</div>
                                                                ) : (
                                                                    <div>کتاب</div>
                                                                )}
                                                            </div>

                                                            <div onClick={() => cartAdder(da._id)} className="cursor-pointer absolute top-1 left-[186px] bg-blue-500 text-white transition-all duration-300 hover:bg-blue-600 rounded-sm text-xs flex justify-center items-center w-24 h-6">
                                                                افزودن به سبد
                                                            </div>

                                                            <h3>{da.title}</h3>
                                                            <p>{da.shortDesc}</p>
                                                            <div className="flex justify-start items-center gap-4">
                                                                <div>{da.buyNumber} فروش</div>
                                                                <div>{priceChanger(da.price)} تومان</div>
                                                            </div>

                                                            <div className="w-[95%] h-[0.16rem] bg-zinc-400 rounded-md"></div>

                                                            <div className="">{
                                                                da.features.length < 1
                                                                    ? (
                                                                        <div className="flex justify-center items-center w-full p-4">بدون ویژگی</div>
                                                                    ) : (
                                                                        da.features.map((fe, i) => (
                                                                            <div key={i} className="flex justify-start items-center  gap-6">
                                                                                <div className="w-40 flex justify-start items-center gap-1">
                                                                                    {spliterForFeatures(fe)[0]}
                                                                                </div>
                                                                                <div>
                                                                                    {spliterForFeatures(fe)[1]}
                                                                                </div>
                                                                            </div>
                                                                        ))
                                                                    )}
                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div onClick={() => productRemover(da._id)} className="absolute bottom-2 left-2 w-16 h-6 flex justify-center items-center gap-2 rounded bg-rose-600 text-white hover:bg-rose-700 transition-all duration-300">حذف <RiDeleteBin6Line /></div>

                                                </div>
                                            ))
                                            }
                                        </div>)
                                    }
                                </div>
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

export default Favorites;