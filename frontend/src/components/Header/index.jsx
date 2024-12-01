"use client";
import { BsTelegram, BsTelephoneFill } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiOutlineYoutube } from "react-icons/ai";
import { GoMail, GoPerson } from "react-icons/go";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Header = () => {
    const [logoHover, setLogoHover] = useState(0);
    const searchRef = useRef();
    const router = useRouter();

    const submitHandler = (e) => {
        e.preventDefault();

        if (searchRef.current.value.length > 0) {
            const url = `/shop?&keyword=${searchRef.current.value.replace(/\s+/g, '_')}`;
            router.push(url);
        } else {
            toast.error("فرم جستجو خالی است", {
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
            })
        }
    }

    return (
        <header className="container mx-auto py-2">
            <div className="flex justify-between items-start gap-4">
                <div className="flex flex-col relative h-52 w-48">
                    <Link href={"/"} className="relative">
                        <div
                            onMouseEnter={() => setLogoHover(1)}
                            onMouseLeave={() => setLogoHover(0)}
                            className="z-30 bg-white relative logo p-5 rounded-lg
                        shadow-[0px_1px_10px_rgba(0,0,0,0.25)] transition-all duration-500
                        hover:shadow-[0px_1px_10px_rgba(0,0,0,0.5)] text-center flex flex-col justify-center items-center">
                            <Image
                                src="/images/logo.png"
                                width={100}
                                height={100}
                                alt="mernfa logo"
                                priority="true"
                                className="rounded-lg"
                            />
                            <div>فروشگاه فایل مرنفا</div>
                        </div>
                    </Link>
                    <div
                        onMouseEnter={() => setLogoHover(1)}
                        onMouseLeave={() => setLogoHover(0)}
                        className={logoHover == 0
                            ? "z-20 absolute bottom-20 right-0 left-0 bg-zinc-100 flex justify-around items-center p-2 text-indigo-600 rounded-br-md rounded-bl-md transition-all duration-500"
                            : "z-20 absolute bottom-0 right-0 left-0 bg-zinc-100 flex justify-around items-center p-2 text-indigo-600 rounded-br-md rounded-bl-md transition-all duration-500"}
                    >
                        <Link href="https://mernfa.ir/nextjs-learning" className="text-[1.5rem] transition-all duration-300 hover:text-orange-500" target={"_blank"}><BsTelegram /></Link>
                        <Link href="https://mernfa.ir/nextjs-learning" className="text-[1.5rem] transition-all duration-300 hover:text-orange-500" target={"_blank"}><AiFillTwitterCircle /></Link>
                        <Link href="https://mernfa.ir/nextjs-learning" className="text-[1.5rem] transition-all duration-300 hover:text-orange-500" target={"_blank"}><AiOutlineYoutube /></Link>
                    </div>
                </div>
                {/*End LOGO Header */}
                <div className="w-full flex flex-col gap-6 py-4 h-40 justify-between">
                    <div className="flex justify-between items-center w-full">
                        <nav className="">
                            <ul className="flex items-center justify-center gap-2">
                                <li>
                                    <Link
                                        href="/"
                                        className="w-32 h-10 rounded-md bg-zinc-200 flex justify-center items-center transition-all duration-300 hover:bg-orange-400 hover:text-white"
                                        target={"_blank"}
                                    >
                                        خانه</Link>
                                </li>
                                <li>
                                    <Link
                                        href="/shop?&maxP=1000000000&minP=0&pgn=12&pn=1"
                                        className="w-32 h-10 rounded-md bg-zinc-200 flex justify-center items-center transition-all duration-300 hover:bg-orange-400 hover:text-white"
                                        target={"_blank"}
                                    >
                                        فروشگاه</Link>
                                </li>

                                <li><Link href="/blog" className="w-32 h-10 rounded-md bg-zinc-200 flex justify-center items-center transition-all duration-300 hover:bg-orange-400 hover:text-white">وبلاگ</Link></li>
                                <li><Link href="/dashboard" className="w-32 h-10 rounded-md bg-zinc-200 flex justify-center items-center transition-all duration-300 hover:bg-orange-400 hover:text-white">داشبورد</Link></li>
                            </ul>
                        </nav>
                        {/*END NAV BAR */}
                        <div className="flex flex-col justify-center items-end gap-3">
                            <div className="flex items-center gap-2">
                                <div>09920320845</div>
                                <div className="rotate-12 rounded bg-zinc-200 p-2">
                                    <BsTelephoneFill className="w-4 h-4 -rotate-12" />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div>mernfa@gmail.com</div>
                                <div className="rotate-12 rounded bg-zinc-200 p-2">
                                    <GoMail className="w-4 h-4 -rotate-12" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <form onSubmit={submitHandler} className="relative flex justify-start items-center w-full ml-8">
                            <input
                                ref={searchRef}
                                className="outline-none w-full p-3 rounded-lg transition-all duration-500 shadow-[0px_0px_5px_rgba(0,0,0,0.15)] focus:shadow-[0px_3px_5px_rgba(0,0,0,0.35)]"
                                name="productsSearch"
                                id="productsSearch"
                                type="text"
                                placeholder="جستجو بین محصولات..."
                            />

                            <button type="submit"
                                className="w-10 absolute left-0 cursor-pointer">
                                <BiSearchAlt className="w-8 h-8" />
                            </button>
                        </form>

                        <div className="flex gap-4 items-center w-[20rem] justify-end">
                            <div className="flex justify-between items-center gap-2">
                                <Link href={"/account/favorite"}><MdFavoriteBorder className="bg-zinc-400 text-white rounded p-2 w-12 h-12 " /></Link>
                                <Link href={"/account/info"}><GoPerson className="bg-zinc-400 text-white rounded p-2 w-12 h-12 " /></Link>
                            </div>

                            <Link href={"/cart"} className="flex gap-2 justify-center items-center bg-orange-400 p-2 rounded-md">
                                <div className="text-orange-500 bg-white rounded-full w-8 h-8 flex justify-center items-center">2</div>
                                <div className="text-white">سبد خرید</div>
                                <div className="text-orange-500 bg-white rounded-lg w-8 h-8 flex justify-center items-center">
                                    <AiOutlineShoppingCart className="w-6 h-6" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
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
        </header>
    );
}

export default Header;