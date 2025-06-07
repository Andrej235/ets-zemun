"use client";
import HeroInfoCard from "@/components/hero-info-card/hero-info-card";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import StudentsPageAntiBullying from "./students-page-anti-bullying";
import StudentsPageMentalHealth from "./students-page-mental-health";
import StudentsPageParentParliament from "./students-page-parent-parliament";
import StudentsPagePartTime from "./students-page-part-time";
import StudentsPagePPService from "./students-page-pp-service";
import StudentsPageStudentParliament from "./students-page-student-parliament";
import "./students.scss";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";

type StudentsProps = {
  exams: Schema<"ExamResponseDto">[];
};

export default function Students({ exams }: StudentsProps) {
  const t = useTranslations();
  const searchParams = useSearchParams();

  const contentContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeSection, setActiveSection] =
    useState<string>("vanredni-ucenici");

  const sections = [
    { id: "ucenicki-parlament", component: <StudentsPageStudentParliament /> },
    { id: "savet-roditelja", component: <StudentsPageParentParliament /> },
    {
      id: "vanredni-ucenici",
      component: <StudentsPagePartTime exams={exams} />,
    },
    { id: "pp-sluzba", component: <StudentsPagePPService /> },
    { id: "nasilje", component: <StudentsPageAntiBullying /> },
    { id: "mentalno-zdravlje", component: <StudentsPageMentalHealth /> },
  ];

  useEffect(() => {
    const searchKey = searchParams.get("searchKey");
    if (!searchKey) return;

    setActiveSection(searchKey === "ispiti" ? "vanredni-ucenici" : searchKey);
    if (searchKey !== "ispiti")
      contentContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [searchParams]);

  const handleCardClick = (sectionName: string) => {
    contentContainerRef.current?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(sectionName);
  };

  const activeComponent = sections.find(
    (section) => section.id === activeSection
  )?.component;

  return (
    <div className="students-page-container" data-search-key="ucenici">
      <section className="hero-space">
        <div className="hero-image">
          <div className="text">
            <h1>{t("students.hero.title")}</h1>
            <h2>{t("students.hero.tagLine")}</h2>
          </div>

          <Image src="/images/students/students-hero.webp" alt="student" fill />
        </div>

        <div className="hero-block">
          <div className="hero-cards">
            <HeroInfoCard
              icon="graduation-cap"
              title={t("students.hero.cards.0")}
              onClick={handleCardClick}
              sectionName="ucenicki-parlament"
              isActive={activeSection === "ucenicki-parlament"}
            />
            <HeroInfoCard
              icon="people-roof"
              title={t("students.hero.cards.1")}
              onClick={handleCardClick}
              sectionName="savet-roditelja"
              isActive={activeSection === "savet-roditelja"}
            />
            <HeroInfoCard
              icon="house-user"
              title={t("students.hero.cards.2")}
              onClick={handleCardClick}
              sectionName="vanredni-ucenici"
              isActive={activeSection === "vanredni-ucenici"}
            />
            <HeroInfoCard
              icon="hands-helping"
              title={t("students.hero.cards.3")}
              onClick={handleCardClick}
              sectionName="pp-sluzba"
              isActive={activeSection === "pp-sluzba"}
            />
            <HeroInfoCard
              icon="face-angry"
              title={t("students.hero.cards.4")}
              onClick={handleCardClick}
              sectionName="nasilje"
              isActive={activeSection === "nasilje"}
            />
            <HeroInfoCard
              icon="brain"
              title={t("students.hero.cards.5")}
              onClick={handleCardClick}
              sectionName="mentalno-zdravlje"
              isActive={activeSection === "mentalno-zdravlje"}
            />
          </div>
        </div>
      </section>

      <div className="content-container" ref={contentContainerRef}>
        {activeComponent}
      </div>
    </div>
  );
}
