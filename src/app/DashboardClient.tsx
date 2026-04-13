"use client";

import { useState } from "react";
import DocumentsPopup from "./DocumentsPopup";

type Metric = {
  label: string;
  value: string;
  tone: "gold" | "purple" | "cyan" | "blue";
};

type TimelineEvent = {
  date: string;
  title: string;
  note: string;
  color: "gold" | "blue" | "green";
};

const metrics: Metric[] = [
  { label: "Credit Score", value: "687", tone: "gold" },
  { label: "Avg Daily Balances", value: "$20,435", tone: "gold" },
  { label: "Positions", value: "2 Pos", tone: "gold" },
  { label: "Deal Size", value: "$42k", tone: "gold" },
  { label: "UW Score", value: "72", tone: "purple" },
  { label: "UCC", value: "2", tone: "gold" },
  { label: "Offers", value: "2", tone: "cyan" },
  { label: "UW Notes", value: "2", tone: "blue" },
];

const stages = ["Apply", "Denied", "UW Inv", "Prelim Offer", "Final UW", "Approved / Issued"];

const keyDetails = [
  ["Assigned To", "Mike R."],
  ["Owner", "Mike"],
  ["Broker", "Broker Name"],
  ["Created", "Jan 15, 2026"],
  ["Last Updated", "Feb 28, 2026"],
  ["Type", "New Business"],
  ["Industry", "Retail"],
];

const documents = [
  "Bank_Statement_Aug_2025.pdf",
  "Bank_Statement_Dec_2025.pdf",
  "Bank_Statement_Jan_2026.pdf",
  "Bank_Statement_Nov_2025.pdf",
  "Bank_Statement_Oct_2025.pdf",
  "Bank_Statement_Sep_2025.pdf",
];

const timeline: TimelineEvent[] = [
  {
    date: "Feb 28, 2026",
    title: "Status Review",
    note: "Underwriting documents reviewed by compliance team. Pending additional verification.",
    color: "gold",
  },
  {
    date: "Feb 20, 2026",
    title: "Document Uploaded",
    note: "Underwriting report uploaded to Google Drive by Mike R.",
    color: "blue",
  },
  {
    date: "Feb 10, 2026",
    title: "Note Added",
    note: "Initial financial projections look promising. Revenue estimate updated.",
    color: "green",
  },
  {
    date: "Jan 28, 2026",
    title: "Stage Changed",
    note: "Deal stage changed from Prelim Offer to UW Inv for deeper analysis.",
    color: "gold",
  },
  {
    date: "Jan 15, 2026",
    title: "Opportunity Created",
    note: "New opportunity created by Mike R. Initial deal value set at $42k.",
    color: "blue",
  },
];

const revenue = [
  { month: "May", amount: 4 },
  { month: "Jun", amount: 3 },
  { month: "Jul", amount: 3 },
  { month: "Aug", amount: 4 },
  { month: "Sep", amount: 24 },
  { month: "Oct", amount: 40 },
  { month: "Nov", amount: 30 },
  { month: "Dec", amount: 4 },
  { month: "Jan", amount: 3 },
  { month: "Feb", amount: 3 },
  { month: "Mar", amount: 3 },
  { month: "Apr", amount: 3 },
];

export default function DashboardClient() {
  const [docsOpen, setDocsOpen] = useState(false);

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <div className="logo">OM</div>
        <nav className="side-icons">
          {Array.from({ length: 10 }).map((_, index) => (
            <button
              key={`side-icon-${index}`}
              className={`icon-btn ${index === 2 ? "active" : ""}`}
              aria-label={`sidebar control ${index + 1}`}
            />
          ))}
        </nav>
        <button className="profile-dot" aria-label="profile" />
      </aside>

      <div className="dashboard-main">
        <header className="topbar">
          <div className="brand-line">Opportunity Management</div>
          <div className="top-actions">
            <button className="pill active">AI Agent</button>
            <button className="pill">Calculator</button>
            <button
              className={`pill${docsOpen ? " docs-active" : ""}`}
              onClick={() => setDocsOpen(true)}
            >
              Documents
            </button>
            <button className="pill">Investigator</button>
          </div>
          <div className="profile-wrap">
            <div className="search-pill">Search across portfolio...</div>
            <div className="avatar">M</div>
          </div>
        </header>

        <main className="content-grid">
          <section className="left-column">
            <div className="panel title-panel">
              <div className="opportunity-meta">717 test, London, England SM4 6LW</div>
              <div className="title-row">
                <h1>717 Test Opportunity</h1>
                <span className="stage-badge">FINAL UW</span>
              </div>
            </div>

            <div className="panel">
              <div className="section-header">
                <h2>Overview</h2>
                <span>Key metrics and deal information</span>
              </div>

              <div className="metrics-grid">
                {metrics.map((metric) => (
                  <article className="metric-card" key={metric.label}>
                    <p>{metric.label}</p>
                    <strong className={metric.tone}>{metric.value}</strong>
                  </article>
                ))}
              </div>

              <div className="stage-progress">
                <p className="muted-label">Deal Stage Progress</p>
                <div className="stage-track">
                  {stages.map((stage, index) => (
                    <div key={stage} className="stage-node-wrap">
                      <div
                        className={`stage-node ${
                          index < 4 ? "done" : index === 4 ? "current" : "upcoming"
                        }`}
                      />
                      <span className={index === 4 ? "current-label" : ""}>{stage}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="details-list">
                <p className="muted-label">Key Details</p>
                {keyDetails.map(([label, value]) => (
                  <div key={label} className="detail-row">
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="section-header">
                <h2>Activity Timeline</h2>
                <span>Detailed history of all opportunity activity</span>
              </div>
              <div className="timeline">
                {timeline.map((event) => (
                  <article key={event.date + event.title} className="timeline-item">
                    <span className={`timeline-dot ${event.color}`} />
                    <div className="timeline-copy">
                      <p className="timeline-heading">
                        <span>{event.date}</span>
                        {event.title}
                      </p>
                      <p>{event.note}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="right-column">
            <div className="panel drive-panel">
              <div className="drive-header">
                <div>
                  <h2>Google Drive</h2>
                  <span>Root Folder / 88</span>
                </div>
                <button className="upload-btn">Upload</button>
              </div>
              <div className="doc-list">
                {documents.map((doc) => (
                  <article className="doc-item" key={doc}>
                    <div className="doc-meta">
                      <span className="doc-icon" />
                      <div>
                        <p>{doc}</p>
                        <span>1.43 MB • Feb 09, 2026</span>
                      </div>
                    </div>
                    <button aria-label={`download ${doc}`} className="mini-btn" />
                  </article>
                ))}
              </div>
            </div>

            <div className="panel chart-panel">
              <div className="chart-header">
                <h2>Business Performance</h2>
                <span>Monthly Revenue Overview</span>
              </div>
              <div className="chart-wrap">
                <div className="y-axis">
                  <span>$50K</span>
                  <span>$40K</span>
                  <span>$30K</span>
                  <span>$20K</span>
                  <span>$10K</span>
                  <span>$0</span>
                </div>
                <div className="bars">
                  {revenue.map((item) => (
                    <div className="bar-col" key={item.month}>
                      <div
                        className={`bar ${item.amount > 10 ? "highlight" : ""}`}
                        style={{ height: `${item.amount * 6}px` }}
                      />
                      <span>{item.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {docsOpen && <DocumentsPopup onClose={() => setDocsOpen(false)} />}
    </div>
  );
}
