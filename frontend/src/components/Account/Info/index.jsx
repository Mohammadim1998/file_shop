"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { BiLogOut } from "react-icons/bi";
import { FiRefreshCw } from "react-icons/fi";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Info = ({ cookie }) => {
    const [data, setData] = useState([-1]);
    const [needRefresh, setNeedRefresh] = useState(0);

    useEffect(() => {
        if (cookie && cookie.length > 0) {
            axios.get("https://file-server.liara.run/api/get-part-of-user-data/info", { headers: { auth_cookie: cookie } })
                .then(d => {
                    setData(d.data);
                    console.log("d.data ===>>>", d.data);
                    setBulkEmailSituation(d.data.emaiSend);
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
                setNeedRefresh(0);
        }
    }, [cookie, needRefresh]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({});

    const miniUpdater = () => {
        const formData = {
            displayname: watch("displayname"),
            password: watch("password"),
            rePassword: watch("rePassword"),
        }
        const backendUrl = `https://file-server.liara.run/api/update-mini-user/${data._id}`;
        axios.post(backendUrl, formData)
            .then((d) => {
                console.log(d.data);
                Cookies.set('auth_cookie', d.data.auth, { expires: 60 });
                const message = d.data.msg ? d.data.msg : "تغییر اطلاعات شما با موفقیت انجام شد."
                toast.success(message, {
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                router.push("/account/info");
                setNeedRefresh(1);
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

    const activateCodeRef = useRef();
    const userEmailConfirmer = (e) => {
        e.preventDefault();
        const formData = {
            activateCode: activateCodeRef.current.value
        }
        const backendUrl = `https://file-server.liara.run/api/confirm-user-email`;
        axios.post(backendUrl, formData)
            .then((d) => {
                console.log(d.data);
                Cookies.set('auth_cookie', d.data.auth, { expires: 60 });
                const message = d.data.msg ? d.data.msg : "تغییر اطلاعات شما با موفقیت انجام شد."
                toast.success(message, {
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                router.push("/account/info");
                setNeedRefresh(1);
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

    const [bulkEmailSituation, setBulkEmailSituation] = useState(true);
    const bulkEmailChanger = (input) => {
        const formData = {
            emailSend: input,
        }
        const backendUrl = `https://file-server.liara.run/api/update-email-user`;
        axios.post(backendUrl, formData)
            .then((d) => {
                console.log(d.data);
                Cookies.set('auth_cookie', d.data.auth, { expires: 60 });
                const message = d.data.msg ? d.data.msg : "تغییر اطلاعات شما با موفقیت انجام شد."
                toast.success(message, {
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                setBulkEmailSituation(input)
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

    const router = useRouter();
    const logouter = () => {
        Cookies.set("auth_cookie", "", { expires: 0 });
        router.push("/login");
    }

    return (
        <div>
            <div>
                {data[0] == -1
                    ? (<div className="flex justify-center items-center p-12">
                        <Image alt="loading" width={120} height={120} src={"/loading.svg"} />
                    </div>)
                    : (
                        <div className="relative flex flex-col gap-8">
                            <div onClick={() => {
                                setNeedRefresh(1);
                                setData([-1]);
                            }} className="absolute top-1 left-1 cursor-pointer text-white bg-indigo-500 rounded flex text-sm justify-center items-center gap-1 w-24 h-10"><FiRefreshCw />به روزرسانی</div>
                            {data.userIsAcive == false
                                ? (
                                    <div className="flex flex-col gap-8 bg-zinc-200 w-full text-sm rounded-md p-4">
                                        <form onSubmit={userEmailConfirmer} className="flex flex-col gap-8 items-center">
                                            <div>کد تایید حساب کاربری</div>
                                            <input
                                                ref={activateCodeRef}
                                                type="text"
                                                className="p-2 rounded-md w-full outline-none border-zinc-400 border-2 focus:border-orange-400"
                                                autoComplete="off"
                                                placeholder="لطفا کدی را که برایتان ایمیل شده را وارد کنید"
                                            />
                                            <button type="submit" className="bg-orange-500 text-white w-full rounded-md p-2 transition-all duration-500 hover:bg-indigo-600">فعال کردن حساب</button>
                                        </form>
                                    </div>
                                ) : (<div></div>)}

                            <div className="flex justify-between items-center gap-4">
                                <div className="flex justify-center gap-4 items-center bg-zinc-300 w-60 text-sm h-10 rounded-md p-1">
                                    <div className="">تاریخ ثبت نام</div>:
                                    <div className="">{data.createdAt}</div>
                                </div>
                                <div className="flex justify-center gap-4 items-center bg-zinc-300 w-60 text-sm h-10 rounded-md p-1">
                                    <div className="">به روز رسانی</div>:
                                    <div className="">{data.updatedAt}</div>
                                </div>
                            </div>

                            <div className="flex flex-col justify-between items-start bg-zinc-200 w-full text-sm rounded-md p-4 gap-4">
                                <div className="flex justify-start items-center gap-4">
                                    <div className="">نام کاربری</div>:
                                    <div className="">{data.username}</div>
                                </div>
                                <div className="flex justify-start items-center gap-4">
                                    <div className="">نام نمایشی</div>:
                                    <div className="">{data.displayname}</div>
                                </div>
                                <div className="flex justify-start items-center gap-4">
                                    <div className="">ایمیل</div>:
                                    <div className="">{data.email}</div>
                                </div>
                            </div>

                            <div className="w-full flex flex-col items-center bg-zinc-200 text-sm rounded-md p-4">
                                <div>به روز رسانی اطلاعات</div>
                                <form onSubmit={handleSubmit(miniUpdater)} className="flex flex-col gap-8 m-12 w-[30rem] bg-zinc-100 p-12 rounded-md">
                                    <div className="flex flex-col gap-1">
                                        <input type="text"
                                            className="p-2 rounded-md w-full outline-none border-zinc-400 border-2 focus:border-orange-400"
                                            placeholder="نام نمایشی جدید"
                                            autoComplete="off"
                                            {...register("displayname", {
                                                required: true,
                                                maxLength: 20,
                                                minLength: 6,
                                            })}
                                        />
                                        {errors.displayname && errors.displayname.type == "required" && (
                                            <div className="text-rose-500 text-sm">نام نمایشی وارد نشده است</div>
                                        )}
                                        {errors.displayname && errors.displayname.type == "maxLength" && (
                                            <div className="text-rose-500">نام نمایشی باید کمتر از 20 کاراکتر باشد</div>
                                        )}
                                        {errors.displayname && errors.displayname.type == "minLength" && (
                                            <div className="text-rose-500">نام نمایشی باید بیشتر از 6 کاراکتر باشد</div>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <input type="password"
                                            className="p-2 rounded-md w-full outline-none border-zinc-400 border-2 focus:border-orange-400"
                                            placeholder="رمز عبور جدید"
                                            autoComplete="off"
                                            {...register("password", {
                                                required: true,
                                                maxLength: 20,
                                                minLength: 6,
                                            })}
                                        />
                                        {errors.password && errors.password.type == "required" && (
                                            <div className="text-rose-500 text-sm">رمز عبور وارد نشده است</div>
                                        )}
                                        {errors.password && errors.password.type == "maxLength" && (
                                            <div className="text-rose-500">رمز عبور باید کمتر از 20 کاراکتر باشد</div>
                                        )}
                                        {errors.password && errors.password.type == "minLength" && (
                                            <div className="text-rose-500">رمز عبور باید بیشتر از 6 کاراکتر باشد</div>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <input type="password"
                                            className="p-2 rounded-md w-full outline-none border-zinc-400 border-2 focus:border-orange-400"
                                            placeholder="تکرار رمز عبور جدید"
                                            autoComplete="off"
                                            {...register("rePassword", {
                                                required: true,
                                                validate: (val) => val === watch("password")
                                            })}
                                        />
                                        {errors.rePassword && errors.rePassword.type == "required" && (
                                            <div className="text-rose-500 text-sm">رمز عبور وارد نشده است</div>
                                        )}
                                        {errors.rePassword && errors.rePassword.type == "validate" && (
                                            <div className="text-rose-500">تکرار رمز عبور مطابقت ندارد</div>
                                        )}
                                    </div>

                                    <button type="submit" className="bg-orange-500 text-white w-full rounded-md p-2 transition-all duration-500 hover:bg-indigo-600">ثبت نام در سایت</button>
                                </form>
                            </div>

                            <div className="w-full flex justify-between items-center bg-zinc-200 text-sm rounded-md p-4">
                                <div className="flex justify-center items-center gap-1 bg-zinc-100 w-60 h-10">
                                    <div>اطلاع رسانی جشنواره ها</div>
                                    {
                                        data.emaiSend == true
                                            ? <button onClick={() => {
                                                bulkEmailChanger(true);
                                            }} className="bg-green-600 text-white flex justify-center items-center w-20 h-6 rounded">روشن</button>
                                            : <button onClick={() => {
                                                bulkEmailChanger(false);
                                            }} className="bg-rose-600 text-white flex justify-center items-center w-20 h-6 rounded">خاموش</button>
                                    }
                                </div>

                                <div className="">
                                    <div onClick={logouter} className="cursor-pointer bg-zinc-100 rounded flex text-sm justify-center items-center gap-1 w-60 h-10"><BiLogOut className="w-8 h-8 text-indigo-400" />خروج از حساب کاربری</div>
                                </div>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}

export default Info;