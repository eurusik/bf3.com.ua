import News from "@/src/components/News";
import { GET_POSTS, Post, PostsData } from "@/src/queries/posts";
import { getClient } from "@faustwp/experimental-app-router";
import { config } from "@/src/faust-config";

// Визначаємо тип для новинних елементів, які використовуються в компоненті News
interface NewsItem {
  title: string;
  comments: number;
  content: string;
  thumbnail?: string;
  categories?: string[];
  permalink: string;
}

// Тестові дані для резервного варіанту, якщо API недоступне
const fallbackNewsItems: NewsItem[] = [
  {
    title: "Battlefield 2042 отримує нове оновлення",
    comments: 15,
    content: "<p>Компанія EA DICE випустила нове оновлення для Battlefield 2042, яке додає нову карту та виправляє численні помилки. Оновлення доступне для завантаження на всіх платформах.</p><p>Нова карта під назвою 'Розлом' представляє собою зруйноване місто з великою кількістю висотних будівель та підземних переходів, що створює цікаві можливості для різних стилів гри.</p><a href=\"/news/battlefield-2042-update\" class=\"more-link\">(далее…)</a>",
    thumbnail: "/images/news/bf2042-update.jpg",
    categories: ["Новини", "Battlefield 2042"],
    permalink: "/news/battlefield-2042-update"
  },
  {
    title: "Ретроспектива: 10 років Battlefield 3",
    comments: 30,
    content: "<p>Сьогодні виповнюється 10 років з моменту виходу легендарної гри Battlefield 3. Гра, яка змінила уявлення про мультиплеєрні шутери та встановила нові стандарти графіки та звуку.</p><p>Battlefield 3 запам'ятався гравцям своїми масштабними картами, руйнуваннями та реалістичною фізикою. Навіть через 10 років після виходу, тисячі гравців все ще повертаються до цієї гри.</p><a href=\"/news/battlefield-3-retrospective\" class=\"more-link\">(далее…)</a>",
    thumbnail: "/images/news/bf3-retrospective.jpg",
    categories: ["Ретроспектива", "Battlefield 3"],
    permalink: "/news/battlefield-3-retrospective"
  }
];

export default async function Home() {
  let newsItems: NewsItem[] = fallbackNewsItems;
  
  try {
    // Отримуємо клієнт Apollo для запитів до WordPress
    const client = await getClient();
    
    // Налаштовуємо URL для запитів
    const uri = process.env.NEXT_PUBLIC_WORDPRESS_URL || config.wpGraphqlUrl;
    
    // Виконуємо запит для отримання постів
    const { data } = await client.query({
      query: GET_POSTS,
      variables: { first: 10 },
      context: {
        uri
      }
    });
    
    if (data?.posts?.nodes?.length > 0) {
      // Перетворюємо дані з WordPress у формат, який очікує компонент News
      const postsData = data as PostsData;
      newsItems = postsData.posts.nodes.map((post: Post) => ({
        title: post.title || '',
        comments: 0, // Можна додати отримання кількості коментарів, якщо потрібно
        content: post.excerpt || '',
        thumbnail: post.featuredImage?.node?.sourceUrl,
        categories: post.categories?.nodes?.map(cat => cat.name) || [],
        permalink: `/post/${post.slug}`
      }));
    }
  } catch (error) {
    console.error('Помилка при отриманні постів з WordPress:', error);
    // Використовуємо резервні дані у випадку помилки
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
        />
      ))}
    </div>
  );
}
