import BreadCrumb from "@/components/Breadcrump";
import RelatedPosts from "@/components/Sliders/RelatedPosts";
import Image from "next/image";
import { TiTickOutline } from "react-icons/ti";
import Link from "next/link";
import { cookies } from "next/headers";
import AddToFav from "@/components/AddToFav";
import AddToCart from "@/components/AddToCart";

const getData = async (slug) => {
   const data = await fetch(
      `https://file-server.liara.run/api/get-product/${slug}`, { cache: "no-store" }
   );
   return data.json();
}

//PRICE BEAUTIFUL
function priceChanger(x) {
   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const SingleProduct = async ({ params }) => {
   const data = await getData(params.slug);

   const spliterForFeatures = (value) => {
      return value.split(":");
   }

   const cookieStore = cookies();
   const auth_cookie = cookieStore.get("auth_cookie");
   const cookieValue = (auth_cookie && auth_cookie.value) ? auth_cookie.value : undefined;

   return (
      <div className=" flex justify-between items-start container mx-auto gap-4">
         {data.msg ? (
            <div>محصول هنوز منتشر نشده است...</div>
         ) : (<>
            <main className="w-[75%]">
               <div className=" flex flex-col gap-12">
                  <BreadCrumb
                     secondTitle={"فروشگاه"}
                     secondLink={"/shop"}
                     title={data.title}
                  />
                  <section className=" flex justify-center items-center rounded-xl p-4 shadow-[0px_0px_8px_rgba(0,0,0,0.25)]">
                     <div className=" flex justify-start items-center gap-4 w-full ">
                        <div>
                           <Image
                              className=" rounded-xl"
                              width={400}
                              height={200}
                              alt={data.imageAlt}
                              title={data.imageAlt}
                              src={data.image}
                              priority={true}
                           />
                        </div>
                        <div className=" h-[12rem] flex flex-col gap-8">
                           <h1 className=" text-lg">{data.title}</h1>
                           <ul className=" flex flex-col gap-3">
                              {data.features.length < 1
                                 ? (<div></div>)
                                 : (
                                    data.features.map((da, i) => (
                                       <li
                                          key={i}
                                          className=" flex justify-between items-center gap-2 w-48"
                                       >
                                          <div className=" flex justify-start items-center gap-1">
                                             <TiTickOutline className=" text-black" />
                                             <span>{spliterForFeatures(da)[0]}</span>
                                          </div>
                                          <div className="text-black">{spliterForFeatures(da)[1]}</div>
                                       </li>
                                    ))
                                 )}
                           </ul>
                        </div>
                     </div>
                  </section>

                  <section className=" flex justify-between items-center gap-2">
                     <div className=" w-[18rem] rounded-md flex justify-center items-center gap-2 bg-slate-100 p-4 transition-all duration-300 hover:bg-slate-200">
                        <div className=" flex justify-start items-center gap-2">
                           <Image
                              className=" rounded-xl"
                              width={100}
                              height={100}
                              alt={"this is alt"}
                              src={"/images/icons/trophy.png"}
                              priority={true}
                           />
                           <div className=" flex flex-col gap-3">
                              <div className=" font-bold text-base sm:text-sm">
                                 محصولات اوریجینال
                              </div>
                              <div className=" text-base sm:text-xs">
                                 برترین های دنیای وب
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className=" w-[18rem] rounded-md flex justify-center items-center gap-2 bg-slate-100 p-4 transition-all duration-300 hover:bg-slate-200">
                        <div className=" flex justify-start items-center gap-2">
                           <Image
                              className=" rounded-xl"
                              width={100}
                              height={100}
                              alt={"this is alt"}
                              src={"/images/icons/feedback.png"}
                              priority={true}
                           />
                           <div className=" flex flex-col gap-3">
                              <div className=" font-bold text-base sm:text-sm">
                                 بالاترین کیفیت
                              </div>
                              <div className=" text-base sm:text-xs">
                                 تاثیرگذارترین در موفقیت
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className=" w-[20rem] rounded-md flex justify-center items-center gap-2 bg-slate-100 p-4 transition-all duration-300 hover:bg-slate-200">
                        <div className=" flex justify-start items-center gap-2">
                           <Image
                              className=" rounded-xl"
                              width={100}
                              height={100}
                              alt={"this is alt"}
                              src={"/images/icons/target1.png"}
                              priority={true}
                           />
                           <div className=" flex flex-col gap-3">
                              <div className=" font-bold text-base sm:text-sm">
                                 پشتیبانی
                              </div>
                              <div className=" text-base sm:text-xs">
                                 کمتر از 30 دقیقه
                              </div>
                           </div>
                        </div>
                     </div>
                  </section>

                  <section>
                     <div className=" flex flex-col gap-6 p-4 rounded-md shadow-[0px_0px_8px_rgba(0,0,0,0.25)]">
                        <h2 className=" text-lg">توضیحات کامل</h2>
                        <p className=" leading-9">
                           {data.longDesc}
                        </p>
                     </div>
                  </section>

                  <section>
                     <RelatedPosts typeOfModel={data.typeOfModel} relPostsData={data.relatedProducts} title={"محصولات مرتبط"} />
                  </section>

                  <section className=" flex flex-col gap-6">
                     <h2 className=" text-xl">دیدگاه ها</h2>
                     <form className=" bg-zinc-700 rounded-md h-48">1</form>
                  </section>
               </div>
            </main>
            <aside className=" w-80 max-w-80 rounded-md flex flex-col gap-8">
               <div className=" flex flex-col gap-8">
                  {/* <button className=" flex justify-center items-center text-center rounded-md p-2 w-full bg-orange-500 transition-all duration-300 hover:bg-orange-600 text-white">{priceChanger(data.price)} تومان - افزودن به سبد خرید</button> */}
                  <AddToCart data={data._id} />
                  <AddToFav data={data._id} />
               </div>
               <div className=" rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
                  <ul className=" flex flex-col gap-4">
                     <li className=" flex justify-between items-center">
                        <span>قیمت محصول</span>
                        <span className="text-blue-500 text-base">{priceChanger(data.price)}</span>
                     </li>
                     <li className=" flex justify-between items-center">
                        <span>تعداد خرید</span>
                        <span>{data.buyNumber}</span>
                     </li>
                     <li className=" flex justify-between items-center">
                        <span>تعداد بازدید</span>
                        <span>{data.pageView}</span>
                     </li>
                     <li className=" flex justify-between items-center">
                        <span>تعداد دیدگاه</span>
                        <span>{data.comments.length}</span>
                     </li>
                  </ul>
               </div>
               <div className=" flex flex-col gap-4 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
                  <h3 className=" text-blue-500">معرفی کوتاه</h3>
                  <p className="  text-sm  text-justify  leading-8">
                     {data.shortDesc}
                  </p>
               </div>
               <div className=" flex flex-col gap-4 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
                  <h3 className=" text-blue-500">دسته بندی ها</h3>
                  <div className=" flex justify-start items-center gap-2 flex-wrap">
                     {data.categories.length < 1
                        ? <div className="flex justify-center items-center p-3">بدون دسته بندی</div>
                        : data.categories.map((da, i) => (
                           <Link
                              key={i}
                              className=" p-2 flex justify-center items-center rounded-md text-base  sm:text-sm bg-zinc-100 transition-all duration-300 hover:text-white hover:bg-orange-500 "
                              href={`/shop?&orderBy=date&maxP=1000000000&minP=0&categories=${da.slug}&pgn=12&pn=1`}
                           >
                              {da.title}
                           </Link>
                        ))}
                  </div>
               </div>
               <div className=" flex flex-col gap-4 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
                  <h3 className=" text-blue-500">برچسب ها</h3>
                  <div className=" flex justify-start items-center gap-2 flex-wrap">
                     {data.tags.length < 1
                        ? <div className="flex justify-center items-center p-3">بدون برچسب</div>
                        : data.tags.map((da, i) => (
                           <Link
                              key={i}
                              className=" p-2 flex justify-center items-center rounded-md text-base  sm:text-sm bg-zinc-100 transition-all duration-300 hover:text-white hover:bg-orange-500 "
                              href={`/search?keyword=${da}`}
                           >
                              #{da}
                           </Link>
                        ))}
                  </div>
               </div>
            </aside>
         </>)}
      </div>
   );
};

export default SingleProduct;