import { GET_POST_BY_SLUG } from "@/src/queries/posts";
import { getClient } from "@faustwp/experimental-app-router";
import { config } from "@/src/faust-config";
import { notFound } from "next/navigation";
import Categories from "@/src/components/Categories";
import PostHeader from "@/src/components/PostHeader";
import PostContent from "@/src/components/PostContent";
import BackToHome from "@/src/components/BackToHome";

interface PostPageProps {
  params: {
    slug: string;
    locale: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const { slug } = resolvedParams;
  let post = null;
  
  try {
    const client = await getClient();
    
    const uri = process.env.NEXT_PUBLIC_WORDPRESS_URL || config.wpGraphqlUrl;
    
    const { data } = await client.query({
      query: GET_POST_BY_SLUG,
      variables: { slug },
      context: { uri }
    });
    
    if (data?.post) {
      post = data.post;
    }
  } catch (error) {
    console.error('Error fetching post:', error);
  }
  
  if (!post) {
    notFound();
  }
  
  return (
    <div className="news-container mt-[0.7rem]">
      <div className="news mb-6 bg-[rgba(0,0,0,0.7)] rounded-[0.8rem] p-4" id="item">
        {/* Post header with title and date */}
        <PostHeader 
          title={post.title}
          slug={post.slug}
          date={post.date}
          locale={resolvedParams.locale}
        />
        
        {/* Post content with featured image */}
        <PostContent 
          content={post.content}
          featuredImage={post.featuredImage}
          title={post.title}
        />
        
        {/* Categories */}
        {(post.categories?.nodes?.length > 0) && (
          <Categories 
            categories={[
              ...(post.categories?.nodes?.map((cat: { name: string }) => cat.name) || [])
            ]} 
          />
        )}
      </div>
      
      {/* Back to home link */}
      <BackToHome />
    </div>
  );
}
