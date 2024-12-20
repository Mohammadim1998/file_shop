import ShopComp from "@/components/ShopComp";

const Shop = ({ searchParams }) => {
    return (
        <div>
            <>
                <title>فروشگاه</title>
                <meta name="description" content={"فروشگاه"} />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={"http://localhost:3000/shop"} />
            </>

            <ShopComp url={searchParams} />
        </div>
    );
}

export default Shop;