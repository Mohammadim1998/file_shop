import MiddleBanners from "@/components/Middle-banners";
import ProductsSlider from "@/components/Sliders/Product-Slider";
import MainSlider from "@/components/Sliders/MainSlider";
import Categories from "@/components/Categories";
import GraphicSlider from "@/components/Sliders/Graphic-Slider";
import NewBlogs from "@/components/NewBlogs";

const getData = async () => {
  // const data = await fetch("https://file-server.liara.run/api/get-new-products", { cache: "no-store" });
  const data = await fetch("https://file-server.liara.run/api/products", { cache: "no-store" });
  return data.json();
}

const Home = async () => {
  const data = await getData();

  return (
    <div>
      <>
        <title>فروشگاه فایل مرنفا</title>
        <meta name="description" content={"فروشگاه فایل مرنفا"} />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={"http://localhost:3000/"} />
      </>

      <main className="w-full flex flex-col gap-12 pb-60">
        <MainSlider />
        <ProductsSlider goalData={data} title="اپلیکیشن ها" linkComp="app" />
        <MiddleBanners />
        <ProductsSlider goalData={data} title="کتاب ها" linkComp="book" />
        <Categories />
        <GraphicSlider goalData={data} />
        <NewBlogs />
      </main>
    </div>
  );
}

export default Home;