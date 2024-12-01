"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "./Box";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";


const AllCategories = ({ setmidBanDetCtrl, setrandNumForBannerClick }) => {
    const goTopCtrl = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const [categories, setcategories] = useState([-1]);
    const [numbersOfBtns, setnumbersOfBtns] = useState([-1]);
    const [filteredBtns, setfilteredBtns] = useState([-1]);
    const [pageNumber, setpageNumber] = useState(1);
    const [allCategoriesNumber, setallCategoriesNumber] = useState(0);
    const paginate = 2;

    useEffect(() => {
        axios
            .get(
                `https://file-server.liara.run/api/categories?pn=${pageNumber}&&pgn=${paginate}`
            )
            .then((d) => {
                setcategories(d.data.GoalCategories);
                setnumbersOfBtns(
                    Array.from(
                        Array(Math.ceil(d.data.AllCategoriesNum / paginate)).keys()
                    )
                );
                setallCategoriesNumber(d.data.AllCategoriesNum);
            })
            .catch((e) => {
                toast.error("خطا در لود اطلاعات", {
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                console.log(e);
            });
    }, [pageNumber]);

    useEffect(() => {
        if (numbersOfBtns[0] != -1 && numbersOfBtns.length > 0) {
            const arr = [];
            numbersOfBtns.map((n) => {
                if (
                    n == 0 ||
                    (n < pageNumber + 1 && n > pageNumber - 3) ||
                    n == numbersOfBtns.length - 1
                ) {
                    arr.push(n);
                }
            });
            setfilteredBtns(arr);
        }
        else if (numbersOfBtns.length == 0) {
            setfilteredBtns([]);
        }
    }, [numbersOfBtns]);



    return (
        <div className=" flex flex-col gap-8">
            <div className=" flex justify-end">
                <div className=" w-32 h-10 rounded bg-indigo-500 flex justify-center items-center text-white">
                    {allCategoriesNumber} دسته
                </div>
            </div>
            <div className=" flex flex-col gap-6">
                {categories[0] == -1 ? (
                    <div className=" flex justify-center items-center p-12">
                        <Image
                            alt="loading"
                            width={120}
                            height={120}
                            src={"/loading.svg"}
                        />
                    </div>
                ) : categories.length < 1 ? (
                    <div className=" flex justify-center items-center w-full p-8">
                        دسته ای موجود نیست...
                    </div>
                ) : (
                    categories.map((ba, i) => (
                        <Box
                            setrandNumForBannerClick={setrandNumForBannerClick}
                            setmidBanDetCtrl={setmidBanDetCtrl}
                            key={i}
                            data={ba}
                        />
                    ))
                )}

            </div>
            <div className=" flex justify-center gap-4 items-center">
                {filteredBtns[0] == -1 ? (
                    <div className=" flex justify-center items-center p-12">
                        <Image
                            alt="loading"
                            width={40}
                            height={40}
                            src={"/loading.svg"}
                        />
                    </div>
                ) : (
                    filteredBtns.map((da, i) => (
                        <button className={
                            da + 1 == pageNumber
                                ? " bg-orange-400 text-white w-8 h-8 flex justify-center items-center rounded transition-all duration-500 hover:bg-orange-500"
                                : " bg-indigo-500 text-white w-8 h-8 flex justify-center items-center rounded transition-all duration-500 hover:bg-orange-500"
                        } onClick={() => {
                            da + 1 == pageNumber
                                ? console.log("")
                                : setcategories([-1]);
                            setpageNumber(da + 1);
                            goTopCtrl();
                        }}
                            key={i}
                        >
                            {da + 1}
                        </button>
                    ))
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

export default AllCategories;