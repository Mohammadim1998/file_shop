import Image from "next/image";
import Link from "next/link";

const CatBox = () => {
    return (
        <Link href={"/"}>
            <div className="flex justify-between items-center transition-all duration-500 bg-slate-100 hover:bg-yellow-400 rounded p-3 w-72">
                <div className="flex flex-col gap-2">
                    <h3 className="text-black">فایل لایه باز فتوشاپ</h3>
                    <p className="text-base sm:text-sm">وکتور های گرافیکی قدرتمند</p>
                </div>

                <div className="w-16">
                    <Image
                        layout="fixed"
                        objectFit="cover"
                        alt="alt"
                        width={50}
                        height={50}
                        src={"/images/categories/photoshop2-min.png"}
                    />
                </div>
            </div>
        </Link>
    );
}

export default CatBox;