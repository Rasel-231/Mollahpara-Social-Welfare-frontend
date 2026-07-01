import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/shared/prisma";

export default async function NewsDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  // ডেটাবেস থেকে ডাটা ফেচ করা
  const article = await prisma.news.findUnique({
    where: { id },
  });

  if (!article) {
    notFound();
  }

  // কন্টেন্টকে প্যারাগ্রাফে ভাগ করা (যদি ডেটাবেসে \n দিয়ে সেভ করা থাকে)
  const paragraphs = article.content.split("\n");

  return (
    <article className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <Image
        src={article.photoUrl}
        alt={article.title}
        width={100}
        height={80}
        priority
        fill
        className="w-full h-64 object-cover rounded-t-lg"
      />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-3">{article.title}</h1>

        <div className="text-sm text-gray-500 mb-6">
          প্রতিবেদন:{" "}
          <span className="font-semibold text-gray-700">{article.author}</span>{" "}
          |{new Date(article.createdAt).toLocaleDateString("bn-BD")}
        </div>

        <div className="space-y-4">
          {paragraphs.map((para, index) => (
            <p key={index} className="text-lg text-gray-800 leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
