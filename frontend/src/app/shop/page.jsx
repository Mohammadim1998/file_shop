import ShopComp from "@/components/ShopComp";

const Shop = ({ searchParams }) => {
    return (
        <div>
            <ShopComp url={searchParams} />
        </div>
    );
}

export default Shop;