"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const SearchBlog = () => {
    const searchRef = useRef();
    const router = useRouter();

    const shopSubmiter = (e) => {
        e.preventDefault();
        if (searchRef.current.value.length < 1) {
            toast.error("فرم جستجو خالی است", {
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
            })
        } else {
            router.push(`/blog?keyword=${searchRef.current.value.replace(/\s+/g, '_')}`)
        }
    }

    return (
        <div>
            <form onSubmit={shopSubmiter} className="border-zinc-700 border-2 px-2 rounded-md flex justify-between items-center">
                <input ref={searchRef} type="text" className="bg-transparent p-2 outline-none text-sm" placeholder="جستجو در وبلاگ..." />
                <button type="submit">
                    <BiSearchAlt className="w-6 h-6" />
                </button>
            </form>
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

export default SearchBlog;