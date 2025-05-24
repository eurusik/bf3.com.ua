import News from "@/src/components/News";
import { GET_POSTS, Post, PostsData } from "@/src/queries/posts";
import { getClient } from "@faustwp/experimental-app-router";
import { config } from "@/src/faust-config";

interface NewsItem {
  title: string;
  comments: number;
  content: string;
  thumbnail?: string;
  categories?: string[];
  permalink: string;
}

export default async function Home() {
  let newsItems: NewsItem[] = [];
  
  try {
    const client = await getClient();
    
    const uri = process.env.NEXT_PUBLIC_WORDPRESS_URL || config.wpGraphqlUrl;
    
    const { data } = await client.query({
      query: GET_POSTS,
      variables: { first: 10 },
      context: {
        uri
      }
    });
    
    if (data?.posts?.nodes?.length > 0) {
      const postsData = data as PostsData;
      newsItems = postsData.posts.nodes.map((post: Post) => ({
        title: post.title || '',
        comments: 0,
        content: post.excerpt || '',
        thumbnail: post.featuredImage?.node?.sourceUrl,
        categories: post.categories?.nodes?.map(cat => cat.name) || [],
        permalink: `/post/${post.slug}`
      }));
    }
  } catch (error) {
    console.error('Помилка при отриманні постів з WordPress:', error);
  }

  return (
    <div className="news-container mt-[0.7rem]">      
      <h1 className="text-2xl md:text-3xl font-light text-white mb-6 text-center md:text-left segoe-ui-font-light">Останні новини</h1>
      
      {newsItems.map((news, index) => (
        <News
          key={index}
          title={news.title}
          comments={news.comments}
          content={news.content}
          thumbnail={news.thumbnail}
          categories={news.categories}
          permalink={news.permalink}
          unoptimized={true}
        />
      ))}
    </div>
  );
}
