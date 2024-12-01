"use client";
import { useEffect, useRef, useState } from "react";
import GraphicSlideBox from "../Sliders/Graphic-slider-box";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

const goTopCtrl = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

const ShopComp = ({ url }) => {
    const router = useRouter();
    const [result, setResult] = useState([-1]);
    const [btns, setBtns] = useState([-1]);
    const [title, setTitle] = useState();

    const [keyword, setKeyword] = useState(url.keyword ? `&keyword=${url.keyword}` : "");
    const [orderBy, setOrderBy] = useState(url.orderBy ? `&orderBy=${url.orderBy}` : "");

    const [categories, setCategories] = useState(url.categories ? `&categories=${url.categories}` : "");
    const [maxPrice, setMaxPrice] = useState(url.maxP ? `&maxP=${url.maxP}` : "&maxP=1000000000");
    const [minPrice, setMinPrice] = useState(url.minP ? `&minP=${url.minP}` : "&minP=0");
    const [minPriceInputNumber, setMinPriceInputNumber] = useState(url.minP ? url.minP : "1000000000");
    const [maxPriceInputNumber, setMaxPriceInputNumber] = useState(url.maxP ? url.maxP : "0");

    const [typeOfPro, setTypeOfPro] = useState(url.type ? `&type=${url.type}` : "");
    const [pgn, setPgn] = useState(url.pgn ? `&pgn=${url.pgn}` : "&pgn=12");
    const [pn, setPn] = useState(url.pn ? `&pn=${url.pn}` : "&pn=1");

    const [searchedProductsNumber, setSearchedProductsNumber] = useState(0);

    const queries = `${keyword ? keyword : ""}${orderBy ? orderBy : ""}${typeOfPro ? typeOfPro : ""}${maxPrice ? maxPrice : ""}${minPrice ? minPrice : ""}${categories ? categories : ""}${pgn ? pgn : ""}${pn ? pn : ""}`;
    const mainFrontUrl = `/shop?${queries}`;
    const mainBackendUrl = `https://file-server.liara.run/api/search-products?${queries}`;

    useEffect(() => {
        setResult([-1]);
        setBtns([-1]);
        setPgn('&pgn=12');
        goTopCtrl();

        router.push(mainFrontUrl)
        axios.get(mainBackendUrl)
            .then((d) => {
                setResult(d.data.allProducts);
                setBtns(d.data.btns);
                setSearchedProductsNumber(d.data.productsNumber);
            })
            .catch((e) => console.log("Error"));
    }, [keyword, orderBy, categories, maxPrice, minPrice, typeOfPro, pgn, pn]);

    //KEYWORD
    useEffect(() => {
        url.keyword == undefined ? setTitle(``) : setTitle(url.keyword.split("_").join(" "));
        setPn(`&pn=1`);
        url.keyword && url.keyword.length > 0
            ? setKeyword(
                `&keyword=${url.keyword.replace(/\s+/g, '_').toLowerCase()}`
            )
            : console.log("");

    }, [url.keyword]);

    //ORDER BY
    const orderByManager = (e) => {
        setOrderBy(`&orderBy=${e.target.value}`);
        setPn(`&pn=1`);
    };

    //TYPE
    const typeOfProductManager = (v) => {
        if (v.target.value == "allpros") {
            setTypeOfPro(``);
            url.keyword == undefined
                ? setTitle(``)
                : setTitle(url.keyword)
        } else {
            setTypeOfPro(`&type=${v.target.value}`);
            url.keyword == undefined
                ? setTitle(v.target.value = "app" ? `اپلیکیشن ها` : (v.target.value == "gr") ? `محصولات گرافیکی` : `کتاب ها`)
                : setTitle(v.target.value = "app" ? `${url.keyword} از اپلیکیشن ها` : (v.target.value == "gr") ? `${url.keyword} از محصولات گرافیکی` : `${url.keyword} از کتاب ها`)
        }
        setPn(`&pn=1`);
    };

    //PRICE
    const maxPRef = useRef();
    const minPRef = useRef();
    const priceManager = (e) => {
        e.preventDefault();

        if (maxPRef.current.value == "" || maxPRef.current.value < 0) {
            maxPRef.current.value = "1000000000";
        }
        if (minPRef.current.value == "" || minPRef.current.value < 0) {
            minPRef.current.value = "0";
        }

        setMaxPrice(`&maxP=${maxPRef.current.value}`);
        setMinPrice(`&minP=${minPRef.current.value}`);
        setPn(`&pn=1`);
    };

    //CATEGORIES
    const [allCategories, setAllCategories] = useState([-1]);
    useEffect(() => {
        const url = "https://file-server.liara.run/api/products-categories-rel";
        axios.get(url)
            .then((d) => setAllCategories(d.data))
            .catch((e) => console.log("Error"))
    }, []);

    const categoriesManager = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;
        if (checked) {
            if (categories.length > 0) {
                setCategories(`${categories},${value}`);
            } else {
                setCategories(`&categories=${value}`);
            }
            setResult([-1]);
        } else {
            const numberOfComos = categories.split(",").length - 1;
            const a = categories.includes(`,${value}`)
                ? categories.replace(`,${value}`, "")
                : (numberOfComos == 0)
                    ? ""
                    : categories.replace(`${value},`, "");
            setCategories(a);
        }
        setPn(`&pn=1`);
    }

    const urlCatsSlugs = url.categories ? url.categories.split(",") : [];
    const urlCatsIds = [];
    urlCatsSlugs.map((c, i) => {
        for (let i = 0; i < allCategories.length; i++) {
            if (c == allCategories[i].slug) {
                urlCatsIds.push(allCategories[i]._id);
            }
        }
    })

    return (
        <div className="container mx-auto flex justify-between items-start gap-2">
            <aside className="w-80 flex flex-col gap-4">
                <div className="flex flex-col gap-4 bg-zinc-100 rounded-lg p-2">
                    <div>مرتب سازی بر اساس</div>
                    <div className="flex gap-2 items-center flex-wrap justify-between">
                        <div className="flex gap-1 items-center justify-center w-28 h-10 text-base sm:text-xs border-2 transition-all duration-300 hover:border-blue-400 border-zinc-200 rounded">
                            <label htmlFor="date">جدیدترین</label>
                            <input
                                type="radio"
                                name="orderBy"
                                id="date"
                                value={"date"}
                                onChange={orderByManager}
                                defaultChecked={orderBy == ""}
                            />
                        </div>

                        <div className="flex gap-1 items-center justify-center w-28 h-10 text-base sm:text-xs border-2 transition-all duration-300 hover:border-blue-400 border-zinc-200 rounded">
                            <label htmlFor="price">قیمت</label>
                            <input
                                type="radio"
                                name="orderBy"
                                id="price"
                                value={"price"}
                                onChange={orderByManager}
                                defaultChecked={orderBy == "&orderBy=price"}
                            />
                        </div>

                        <div className="flex gap-1 items-center justify-center w-28 h-10 text-base sm:text-xs border-2 transition-all duration-300 hover:border-blue-400 border-zinc-200 rounded">
                            <label htmlFor="pageView">پربازدید ترین</label>
                            <input
                                type="radio"
                                name="orderBy"
                                id="pageView"
                                value={"pageView"}
                                onChange={orderByManager}
                                defaultChecked={orderBy == "&orderBy=pageView"}
                            />
                        </div>

                        <div className="flex gap-1 items-center justify-center w-28 h-10 text-base sm:text-xs border-2 transition-all duration-300 hover:border-blue-400 border-zinc-200 rounded">
                            <label htmlFor="buyNumber">پرفروش ترین</label>
                            <input
                                type="radio"
                                name="orderBy"
                                id="buyNumber"
                                value={"buyNumber"}
                                onChange={orderByManager}
                                defaultChecked={orderBy == "&orderBy=buyNumber"}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 bg-zinc-100 rounded-lg p-2">
                    <div>نوع محصول</div>
                    <div className="flex gap-2 items-center flex-wrap justify-between">
                        <div className="flex gap-1 items-center justify-center w-28 h-10 text-base sm:text-xs border-2  transition-all duration-300 hover:border-blue-400 border-zinc-200 rounded">
                            <label htmlFor="allpros">همه</label>
                            <input
                                type="radio"
                                name="typeOfProduct"
                                id="allpros"
                                value={"allpros"}
                                onChange={typeOfProductManager}
                                defaultChecked={orderBy == ''}
                            />
                        </div>
                        <div className="flex gap-1 items-center justify-center w-28 h-10 text-base sm:text-xs border-2  transition-all duration-300 hover:border-blue-400 border-zinc-200 rounded">
                            <label htmlFor="app">اپلیکیشن</label>
                            <input
                                type="radio"
                                name="typeOfProduct"
                                id="app"
                                value={"app"}
                                onChange={typeOfProductManager}
                                defaultChecked={typeOfPro == '&type=app'}
                            />
                        </div>

                        <div className="flex gap-1 items-center justify-center w-28 h-10 text-base sm:text-xs border-2  transition-all duration-300 hover:border-blue-400 border-zinc-200 rounded">
                            <label htmlFor="book">کتاب</label>
                            <input
                                type="radio"
                                name="typeOfProduct"
                                id="book"
                                value={"book"}
                                onChange={typeOfProductManager}
                                defaultChecked={typeOfPro == '&type=book'}
                            />
                        </div>
                        <div className="flex gap-1 items-center justify-center w-28 h-10 text-base sm:text-xs border-2  transition-all duration-300 hover:border-blue-400 border-zinc-200 rounded">
                            <label htmlFor="gr">فایل گرافیکی</label>
                            <input
                                type="radio"
                                name="typeOfProduct"
                                id="gr"
                                value={"gr"}
                                onChange={typeOfProductManager}
                                defaultChecked={typeOfPro == '&type=gr'}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 bg-zinc-100 rounded-lg p-2">
                    <div>(تومان) بازه قیمت</div>
                    <form onSubmit={priceManager} className="flex gap-4 flex-col">
                        <div className="flex gap-2 items-center flex-wrap justify-between">
                            <input
                                ref={minPRef}
                                defaultValue={minPriceInputNumber}
                                className="inputLtr text-center w-28 h-10 text-base sm:text-xs border-2 transition-all duration-300 outline-none focus:border-blue-400 border-zinc-200 rounded"
                                type="number"
                                placeholder="حداقل قیمت"
                                min={0}
                            />
                            <input
                                ref={maxPRef}
                                defaultValue={maxPriceInputNumber}
                                className="inputLtr text-center w-28 h-10 text-base sm:text-xs border-2 transition-all duration-300 outline-none focus:border-blue-400 border-zinc-200 rounded"
                                type="number"
                                placeholder="حداکثر قیمت"
                                min={0}
                            />
                        </div>
                        <button type="submit"
                            className="w-full bg-orange-400 p-2 rounded h-10 flex justify-center items-center text-white transition-all duration-500"
                        >
                            اعمال فیلتر قیمت
                        </button>
                    </form>
                </div>

                <div className="flex flex-col gap-4 bg-zinc-100 rounded-lg p-2">
                    <div>دسته بندی</div>
                    <div className="flex gap-2 items-center flex-wrap justify-between">
                        {
                            allCategories[0] == -1
                                ? <div className="w-full flex justify-center items-center p-12">
                                    <Image
                                        alt="loading"
                                        width={40}
                                        height={40}
                                        src={"/loading.svg"}
                                    />
                                </div>
                                : allCategories.length < 1
                                    ? (<div>دسته ای موجود نیست</div>)
                                    : (
                                        <div className="flex justify-center items-center w-full">
                                            <div className="flex gap-2 flex-wrap justify-around items-center">
                                                {allCategories.map((category, index) => (
                                                    <div
                                                        key={index}
                                                        className="w-28 flex gap-1 items-center justify-between p-2 text-base sm:text-xs border-2  transition-all duration-300 hover:border-blue-400 border-zinc-200 rounded">
                                                        <label htmlFor={category.slug}>{category.title}</label>
                                                        {urlCatsIds.length < 1
                                                            ? (<input
                                                                onClick={categoriesManager}
                                                                type="checkbox"
                                                                id={category.slug}
                                                                value={category.slug}
                                                            />
                                                            ) : (<input
                                                                onClick={categoriesManager}
                                                                type="checkbox"
                                                                id={category.slug}
                                                                value={category.slug}
                                                                defaultChecked={urlCatsIds.includes(category._id)}
                                                            />
                                                            )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>)}
                    </div>
                </div>
            </aside>

            <main className="bg-zinc-100 rounded-lg p-2 w-full flex flex-col gap-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl text-indigo-600">محصولات <span className="text-pink-400 font-semibold text-xl">{title}</span> فروشگاه فایل مرنفا </h1>
                    <div className="text-base sm:text-sm rounded-md border-2 border-indigo-600 w-20 h-8 flex justify-center items-center">{searchedProductsNumber} محصول</div></div>
                <div className="flex flex-col gap-6">

                    <section className="flex justify-center items-center gap-4">
                        {result[0] == -1 ? (
                            <div className="w-full flex justify-center items-center p-12">
                                <Image
                                    alt="loading"
                                    width={120}
                                    height={120}
                                    src={"/loading.svg"}
                                />
                            </div>
                        ) : result.length < 1 ? (
                            <div>محصولی با این شرایط موجود نیست...</div>
                        ) : (
                            <div className="flex justify-between flex-wrap ">
                                {
                                    result.map((da, i) => <GraphicSlideBox key={i} itemData={da} />)
                                }
                            </div>
                        )}
                    </section>

                    <section className="flex justify-center items-center gap-4 flex-wrap">
                        {
                            btns[0] == -1
                                ? (<div className="w-full flex justify-center items-center p-12">
                                    <Image
                                        alt="loading"
                                        width={120}
                                        height={120}
                                        src={"/loading.svg"}
                                    />
                                </div>)
                                : btns.map((btn, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            if (pn == `&pn=${btn + 1}`) {
                                                goTopCtrl();
                                            } else {
                                                setPn(`&pn=${btn + 1}`);
                                                setPgn(`&pgn=12`);
                                                goTopCtrl();
                                                setResult([-1]);
                                            }
                                        }}
                                        className={`${pn == `&pn=${btn + 1}`
                                            ? "bg-orange-400 text-white w-8 h-8 flex justify-center items-center rounded transition-all duration-500 hover:bg-orange-500"
                                            : "bg-indigo-500 text-white w-8 h-8 flex justify-center items-center rounded transition-all duration-500 hover:bg-orange-500"
                                            }`}>{btn + 1}</button>
                                ))}
                    </section>
                </div>
            </main>
        </div>
    )
}

export default ShopComp;