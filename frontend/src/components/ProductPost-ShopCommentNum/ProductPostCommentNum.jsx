"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa";

const ProductPostCommentNum = ({ goalId }) => {
    const [commentsNumber, setCommentsNumber] = useState(-1);
    useEffect(() => {
        axios.get(`https://file-server.liara.run/api/get-comments-number/${goalId}`)
            .then(d => { setCommentsNumber(d.data.number) })
            .catch(e => { console.log(e) })
    })

    return (
        <div className="bg-zinc-100 rounded-md p-2 flex justify-between items-center gap-2">
            <FaRegComment className="w-6 h-6 text-black" />
            <span>تعداد دیدگاه: </span>
            <span>
                {commentsNumber == -1
                    ? (<div className="flex justify-center items-center ">
                        <Image alt="loading" width={10} height={10} src={"/loading.svg"} />
                    </div>)
                    :( commentsNumber)}
            </span>
        </div>
    );
}

export default ProductPostCommentNum;