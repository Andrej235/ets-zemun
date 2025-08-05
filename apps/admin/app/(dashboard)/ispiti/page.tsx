"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ExamsPage() {
  const [html, setHtml] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload-pdf", {
      method: "POST",
      body: formData,
    });

    const text = await res.text();
    console.log(text);
    setHtml(text);
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ispiti</h1>
          <p className="text-muted-foreground">
            Upravljajte ispitima za vanredne učenike
          </p>
        </div>
        <Button asChild>
          <Link href="/ispiti/novi">
            <Plus className="mr-2 h-4 w-4" />
            Dodaj ispit
          </Link>
        </Button>
      </div>

      <div>
        <Input type="file" accept="application/pdf" onChange={handleUpload} />
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
