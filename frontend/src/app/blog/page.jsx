import BlogComp from "@/components/BlogPage";

const Blog = ({searchParams}) => {
    return (
        <div>
            <BlogComp url={searchParams} />
        </div>
    );
}

export default Blog;