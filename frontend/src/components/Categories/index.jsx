"use client";
import CatBox from "./Box";

const getData = async () => {
    const data = await fetch("https://file-server.liara.run/api/get-active-categories", { cache: "no-store" });
    return data.json();
}

const GraphicCategories = async () => {
    const data = await getData();

    return (
        <>{data.length < 1 ? (<div>چیزی یافت نشد ...</div>)
            : (
                <section className="container mx-auto flex justify-center sm:justify-between items-center flex-wrap gap-2 mt-4">
                    {data.map((da, i) => (
                        <CatBox key={i} data={da} />
                    ))}
                </section>
            )}</>
    );
}

export default GraphicCategories;