import News from "@/src/components/News";

export default function Home() {
  const newsItems = [
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

  return (
    <div className="news-container mt-[0.7rem]">      
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
