"use client";
import type { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import useOutsideClick from "@/lib/hooks/use-outside-click";
import Image from "next/image";
import { useRef, useState } from "react";
import Icon from "../icon/icon";

type ExpandedTeacherCardProps = {
  readonly teacher: Schema<"TeacherResponseDto">;
  readonly onRequestClose: () => void;
};

export default function ExpandedTeacherCard({
  teacher,
  onRequestClose,
}: ExpandedTeacherCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("overview");

  useOutsideClick(containerRef, onRequestClose);
  console.log(teacher);

  const tabs = [
    { id: "overview", label: "Overview", icon: "user" },
    { id: "subjects", label: "Subjects", icon: "book" },
    { id: "qualifications", label: "Qualifications", icon: "graduation-cap" },
    { id: "contact", label: "Contact", icon: "envelope" },
  ];

  return (
    <div className="expanded-overlay">
      <div className="expanded-teacher-card" ref={containerRef}>
        <button className="close-button" onClick={onRequestClose}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="expanded-header">
          <div className="teacher-image-large">
            <Image
              src={teacher.image || "/placeholder.svg"}
              alt={teacher.name}
              fill
            />
          </div>

          <div className="teacher-info-header">
            <h1>{teacher.name}</h1>
            <p className="teacher-title-large">{teacher.title}</p>
            <div className="teacher-stats">
              <div className="stat-item">
                <span className="stat-number">{teacher.subjects.length}</span>
                <span className="stat-label">Subjects</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">
                  {teacher.qualifications.length}
                </span>
                <span className="stat-label">Qualifications</span>
              </div>
            </div>
          </div>
        </div>

        <div className="expanded-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon className="tab-icon" name={tab.icon} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="expanded-content">
          {activeTab === "overview" && (
            <div className="tab-content overview-content">
              <div className="bio-section">
                <h3>About {teacher.name}</h3>
                <p className="bio-text">{teacher.bio || "No bio provided."}</p>
              </div>

              <div className="quick-info">
                <div className="info-card">
                  <h4>Teaching Focus</h4>
                  <div className="focus-subjects">
                    {teacher.subjects.slice(0, 3).map((subject) => (
                      <span key={subject.id} className="focus-tag">
                        {subject.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "subjects" && (
            <div className="tab-content subjects-content">
              <h3>Teaching Subjects</h3>
              <div className="subjects-grid">
                {teacher.subjects.map((subject) => (
                  <div key={subject.id} className="subject-card">
                    <div className="subject-icon">
                      <Icon name="book-open" />
                    </div>
                    <h4>{subject.name}</h4>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "qualifications" && (
            <div className="tab-content qualifications-content">
              <h3>Qualifications & Certifications</h3>
              <div className="qualifications-list">
                {teacher.qualifications.map((qualification) => (
                  <div key={qualification.id} className="qualification-item">
                    <div className="qualification-icon">
                      <Icon name="graduation-cap" />
                    </div>
                    <div className="qualification-details">
                      <p className="qualification-date">
                        {new Date(
                          qualification.dateObtained
                        ).toLocaleDateString()}
                      </p>

                      <h4 className="qualification-name">
                        {qualification.name}
                      </h4>
                      <p className="qualification-description">
                        {qualification.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="tab-content contact-content">
              <h3>Get in Touch</h3>
              <div className="contact-info-detailed">
                <div className="contact-method">
                  <div className="contact-icon">
                    <Icon name="envelope" />
                  </div>
                  <div className="contact-details">
                    <h4>Email</h4>
                    <a href={`mailto:${teacher.email}`}>{teacher.email}</a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
