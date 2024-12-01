"use client";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RegisterForm = () => {
    const [auth_cookie, setauth_cookie] = useState(Cookies.get("auth_cookie"));
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({});

    const formSubmiter = () => {
        const formData = {
            username: watch("username"),
            displayname: watch("displayname"),
            email: watch("email"),
            password: watch("password"),
            rePassword: watch("rePassword"),
            favoriteProducts: [],
            userProducts: [],
            comments: [],
            payments: [],
            cart: [],
            viewed: false,
            userIsAcive: false,
            emailSend: true,
        }
        const backendUrl = "https://file-server.liara.run/api/new-user";
        axios.post(backendUrl, formData)
            .then((d) => {
                console.log(d.data);

                Cookies.set('auth_cookie', d.data.auth,{expires:60});
                const message = d.data.msg ? d.data.msg : "ثبت نام شما با موفقیت انجام شد."
                toast.success(message, {
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                router.push("/account/info")
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

//IF USER HAVE TOKEN SHOULD BE REDIRECTED TO ACCOUNT PAGE
    useEffect(() => {
        setauth_cookie(Cookies.get("auth"))
    }, [Cookies.get("auth")]);

    return (
        <section className="container mx-auto flex justify-center items-center">
            <form onSubmit={handleSubmit(formSubmiter)} className="flex flex-col gap-8 m-12 w-[30rem] bg-zinc-100 p-12 rounded-md">
                <div className="flex justify-center items-center gap-x-6">
                    <h1 className="text-lg text-center text-blue-400">ثبت نام در سایت</h1>
                    <Link href={"/login"} className="bg-blue-500 text-white px-2 py-1 rounded-md">ورود به حساب</Link>
                </div>

                <div className="flex flex-col gap-1">
                    <input type="text"
                        className="p-2 rounded-md w-full outline-none border-zinc-400 border-2 focus:border-orange-400"
                        placeholder="نام کاربری"
                        autoComplete="off"
                        {...register("username", {
                            required: true,
                            maxLength: 20,
                            minLength: 6,
                        })}
                    />
                    {errors.username && errors.username.type == "required" && (
                        <div className="text-rose-500 text-sm">نام کاربری وارد نشده است</div>
                    )}
                    {errors.username && errors.username.type == "maxLength" && (
                        <div className="text-rose-500">نام کاربری باید کمتر از 20 کاراکتر باشد</div>
                    )}
                    {errors.username && errors.username.type == "minLength" && (
                        <div className="text-rose-500">نام کاربری باید بیشتر از 6 کاراکتر باشد</div>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <input type="text"
                        className="p-2 rounded-md w-full outline-none border-zinc-400 border-2 focus:border-orange-400"
                        placeholder="نام نمایشی"
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
                    <input type="email"
                        className="p-2 rounded-md w-full outline-none border-zinc-400 border-2 focus:border-orange-400"
                        placeholder="ایمیل"
                        autoComplete="off"
                        {...register("email", {
                            required: true,
                            minLength: 11,
                            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                        })}
                    />
                    {errors.email && errors.email.type == "required" && (
                        <div className="text-rose-500 text-sm">ایمیل را وارد کنید</div>
                    )}
                    {errors.email && errors.email.type == "pattern" && (
                        <div className="text-rose-500">فرمت ایمیل صحیح نیست</div>
                    )}
                    {errors.email && errors.email.type == "minLength" && (
                        <div className="text-rose-500">تعداد کاراکتر های ایمیل کم است</div>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <input type="password"
                        className="p-2 rounded-md w-full outline-none border-zinc-400 border-2 focus:border-orange-400"
                        placeholder="رمز عبور"
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
                        placeholder="تکرار رمز عبور"
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

                <button type="submit" className="bg-blue-500 text-white w-full rounded-md p-2 transition-all duration-500 hover:bg-blue-600">ثبت نام در سایت</button>
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
        </section>
    );
}

export default RegisterForm;