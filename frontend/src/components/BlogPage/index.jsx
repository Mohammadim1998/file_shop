"use client";
import { useEffect, useState } from "react";
import BlogBox from "../NewBlogs/BlogBox";
import Image from "next/image";
import axios from "axios";
import SearchBlog from "../SearchBlog";

const BlogComp = ({ url }) => {
    const goTopCtrl = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const [posts, setPosts] = useState([-1]);
    const [pgn, setPgn] = useState(url.pgn ? `&pgn=${url.pgn}` : '&pgn=4')
    const [pn, setPn] = useState(url.pn ? `&pn=${url.pn}` : '&pn=1')
    const [btns, setBtns] = useState([-1])
    const [searchedPostsNumbers, setSearchedPostsNumbers] = useState(0);
    const [keyword, setKeyword] = useState(url.keyword ? `&keyword=${url.keyword}` : "")

    useEffect(() => {
        setPosts([-1]);
        setBtns([-1]);
        setPn('&pn=1');
        setKeyword((url.keyword && url.keyword.length > 0) ? `&keyword=${url.keyword}` : "")
    }, [url.keyword]);

    useEffect(() => {
        axios.get(`https://file-server.liara.run/api/search-posts?${pgn}${pn}${keyword}`)
            .then(d => {
                setPosts(d.data.allPosts);
                setBtns(d.data.btns);
                setSearchedPostsNumbers(d.data.postsNumber);
            })
            .catch(e => console.log("error"))
    }, [pn,keyword]);

    return (
        <div className="flex flex-col gap-8 px-8">
            <section className="flex flex-col gap-8">
                <div className="flex justify-start items-center gap-4">
                    <h1 className="text-center text-xl text-indigo-600">وبلاگ فروشگاه فایل مرنفا</h1>
                    <div className="flex justify-center items-center w-20 h-10 rounded text-base sm:text-sm border-2 border-indigo-500">{searchedPostsNumbers} مقاله</div>
                </div>
            </section>

            <div className="mr-auto w-60"><SearchBlog /></div>

            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                    {posts[0] == -1
                        ? (
                            <div className="flex justify-center items-center p-12">
                                <Image alt="loading" width={120} height={120} src={"/loading.svg"} />
                            </div>
                        ) : posts.length < 1
                            ? (<div className="flex justify-center items-center w-full p-8">پست موجود نیست ...</div>)
                            : (<div className="flex flex-wrap justify-between items-center gap-2">
                                {posts.map((da, i) => (
                                    <BlogBox
                                        key={i}
                                        data={da}
                                    />
                                ))}
                            </div>
                            )}
                </div>

                <div className=" flex justify-center gap-4 items-center">
                    {btns[0] == -1 ? (
                        <div className=" flex justify-center items-center p-12">
                            <Image
                                alt="loading"
                                width={40}
                                height={40}
                                src={"/loading.svg"}
                            />
                        </div>
                    ) : (
                        btns.map((btn, i) => (
                            <button key={i} onClick={() => {
                                if (pn == `&pn=${btn + 1}`) {
                                    goTopCtrl();
                                } else {
                                    setPosts([-1]);
                                    goTopCtrl();
                                    setPn(`&pn=${btn + 1}`)
                                }
                            }} className={pn == `&pn=${btn + 1}`
                                ? "bg-orange-400 text-white w-8 h-8 flex justify-center items-center rounded transition-all duration-500 hover:bg-orange-500"
                                : "bg-indigo-500 text-white w-8 h-8 flex justify-center items-center rounded transition-all duration-500 hover:bg-orange-500"
                            }
                            >
                                {btn + 1}
                            </button>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default BlogComp;