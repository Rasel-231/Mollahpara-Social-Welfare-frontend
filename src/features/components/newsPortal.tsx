"use client"

interface ArticleProps {
  title: string;
  author: string;
  date: string;
  image: string;
  content: string[];
}

export default function DynamicArticle({ title, author, date, image, content }: ArticleProps) {
  return (
    <article className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <img src={image} alt={title} className="w-full h-64 object-cover rounded-t-lg" />
      
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-3">{title}</h1>
        
        <div className="text-sm text-gray-500 mb-6">
          প্রতিবেদন: <span className="font-semibold text-gray-700">{author}</span> | {date}
        </div>

        <div className="space-y-4">
          {content.map((paragraph, index) => (
            <p key={index} className="text-lg text-gray-800 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}