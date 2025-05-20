"use client";

import sendApiRequest from "@/api-dsl/send-api-request";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { TranslationStatusBadge } from "@/components/translation-status-badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import getTranslationStatus from "@/lib/get-translation-status";
import { useLanguageStore } from "@/stores/language-store";
import { ExternalLink, Plus, Search, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Award = Schema<"AdminAwardResponseDto">;

export default function Nagrade() {
  const languages = useLanguageStore((x) => x.languages);
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [awardToDelete, setAwardToDelete] = useState<Award | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const awards = await sendApiRequest("/award/admin", {
        method: "get",
      });

      if (!awards.isOk) {
        toast.error("Failed to load awards");
        return;
      }

      setAwards(awards.response!);
      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredAwards = awards.filter(
    (award) =>
      award.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      award.competition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      award.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      award.student.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Awards</h1>
          <p className="text-muted-foreground">
            Manage awards and their translations
          </p>
        </div>
        <Button asChild>
          <Link href="/nastavnici/novi">
            <Plus className="mr-2 h-4 w-4" />
            Add award
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search teachers..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden p-0">
              <Skeleton className="h-64 w-full" />

              <CardContent>
                <div className="mb-2 flex justify-between text-sm text-muted-foreground">
                  <Skeleton className="h-5 w-48 rounded-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>

                <Skeleton className="mb-2 h-6 w-3/4" />
                <Skeleton className="mb-2 h-6 w-4/5" />
                <Skeleton className="mb-4 h-16 w-full" />

                <div className="mb-4 flex gap-2">
                  <Skeleton className="h-5 w-18 rounded-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>

                <div className="mb-6 flex items-center justify-between">
                  <Skeleton className="h-6 w-16" />

                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-12" />
                    <Skeleton className="h-6 w-12" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filteredAwards.map((award) => (
            <Card key={award.id} className="overflow-hidden p-0">
              <div className="relative h-64">
                <Image
                  src={award.image}
                  alt={award.title}
                  fill
                  className="h-64 w-full object-cover"
                />
              </div>

              <CardContent>
                <div className="mb-2 flex justify-between text-sm text-muted-foreground">
                  <p>Won by: {award.student}</p>

                  <p>{award.dayOfAward}</p>
                </div>

                <h1 className="text-xl font-semibold">{award.competition}</h1>
                <h2 className="text-md mb-2">{award.title}</h2>

                <p className="mb-2 text-sm text-muted-foreground">
                  {award.description}
                </p>

                <div className="my-4 flex flex-wrap gap-2">
                  {Object.entries(
                    getTranslationStatus(
                      award.translations,
                      languages.map((x) => x.code),
                    ),
                  ).map(([lang, status]) => (
                    <TranslationStatusBadge
                      key={lang}
                      language={lang}
                      status={status}
                    />
                  ))}
                </div>

                <div className="mb-6 flex justify-between">
                  <Button variant="outline">Edit</Button>

                  <div className="space-x-2">
                    {award.externalLink && (
                      <Button variant="outline" asChild>
                        <a
                          href={award.externalLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ExternalLink className="size-4" />
                          <p className="sr-only">External link</p>
                        </a>
                      </Button>
                    )}

                    <AlertDialog
                      open={awardToDelete?.id === award.id}
                      onOpenChange={(open) => {
                        if (!open) setAwardToDelete(null);
                      }}
                    >
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          onClick={() => setAwardToDelete(award)}
                        >
                          <Trash2 />
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete the award &quot;
                            {award.competition || "Unnamed award"}&quot; and all
                            it&apos;s information. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {}}
                            className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
