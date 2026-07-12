"use client";
import { useParams } from "next/navigation";
import MediaCrudPage from "@/features/admin/components/media/mediaCrudPage";

export default function CategoryDetailsPage() {
  const { category } = useParams();
  return <MediaCrudPage category={category as string} />;
}
