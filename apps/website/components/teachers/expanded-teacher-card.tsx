"use client";
import type { Schema } from "@/api-dsl/types/endpoints/schema-parser";

type ExpandedTeacherCardProps = {
  readonly teacher: Schema<"TeacherResponseDto">;
  readonly onRequestClose: () => void;
};

export default function ExpandedTeacherCard({
  teacher,
  onRequestClose,
}: ExpandedTeacherCardProps) {
  return <></>;
}
