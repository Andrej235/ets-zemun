"use client";
import sendApiRequest from "@/api-dsl/send-api-request";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import ApprovalStatusBadge from "@/components/approval-status-badge";
import { TranslationStatusBadge } from "@/components/translation-status-badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import getTranslationStatus from "@/lib/get-translation-status";
import { useLanguageStore } from "@/stores/language-store";
import { motion } from "framer-motion";
import { CheckCircle, FileText, Plus, Trash2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type News = Schema<"AdminNewsPreviewResponseDto">;

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const languages = useLanguageStore((state) => state.languages);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await sendApiRequest("/news/admin", {
          method: "get",
          parameters: {
            limit: -1,
            offset: 0,
          },
        });
        setNews(data.response!);
      } catch {
        toast.error("Failed to load news articles");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleApprove = async (id: number) => {
    const promise = sendApiRequest("/news/approve/{id}", {
      method: "put",
      parameters: {
        id,
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Failed to approve news article",
          );
      }),
      {
        loading: "Approving news article...",
        success: "News article approved successfully",
        error: (x) => (x as Error).message,
      },
    );

    if (!(await promise).isOk) return;

    setNews(
      news.map((item) =>
        item.id === id ? { ...item, isApproved: true } : item,
      ),
    );
  };

  const handleUnapprove = async (id: number) => {
    const promise = sendApiRequest("/news/disapprove/{id}", {
      method: "put",
      parameters: {
        id,
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Failed to unapprove news article",
          );
      }),
      {
        loading: "Unapproving news article...",
        success: "News article unapproved successfully",
        error: (x) => (x as Error).message,
      },
    );

    if (!(await promise).isOk) return;

    setNews(
      news.map((item) =>
        item.id === id ? { ...item, isApproved: false } : item,
      ),
    );
  };

  const handleDelete = async (id: number) => {
    const promise = sendApiRequest("/news/{id}", {
      method: "delete",
      parameters: {
        id,
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Failed to delete news article",
          );
      }),
      {
        loading: "Deleting news article...",
        success: "News article deleted successfully",
        error: (x) => (x as Error).message,
      },
    );
  };

  const filteredNews = news.filter((item) => {
    const searchLower = searchTerm.toLowerCase();

    return (
      item.title.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">News Articles</h1>
          <p className="text-muted-foreground">
            Manage news articles for the school website
          </p>
        </div>
        <Button asChild>
          <Link href="/vesti/novi">
            <Plus className="mr-2 h-4 w-4" />
            Add News Article
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <FileText className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search news articles..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="p-0">
                <Skeleton className="h-48 w-full rounded-t-lg" />
              </CardHeader>
              <CardContent className="p-4">
                <Skeleton className="mb-2 h-6 w-3/4" />
                <Skeleton className="mb-4 h-4 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredNews.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <FileText className="mb-4 h-10 w-10 text-muted-foreground" />
            <CardTitle className="mb-2">No news articles found</CardTitle>
            <CardDescription>
              {searchTerm
                ? "Try a different search term"
                : "Add your first news article to get started"}
            </CardDescription>
            {!searchTerm && (
              <Button asChild className="mt-4">
                <Link href="/vesti/novi">
                  <Plus className="mr-2 h-4 w-4" />
                  Add News Article
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {filteredNews.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={item.previewImage || "/placeholder.svg"}
                    alt={item.title || "News image"}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="mb-2 flex justify-between">
                    <p className="text-sm text-muted-foreground">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                    <ApprovalStatusBadge isApproved={item.isApproved} />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {Object.entries(
                      getTranslationStatus(
                        item.translations,
                        languages.map((lang) => lang.code),
                      ),
                    ).map(([lang, status]) => (
                      <TranslationStatusBadge
                        key={lang}
                        language={lang}
                        status={status}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/vesti/${item.id}`}>Edit</Link>
                    </Button>
                    <div className="flex gap-2">
                      {!item.isApproved && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleApprove(item.id)}
                        >
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Approve
                        </Button>
                      )}

                      {item.isApproved && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUnapprove(item.id)}
                        >
                          <XCircle className="mr-1 h-4 w-4" />
                          Unapprove
                        </Button>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
