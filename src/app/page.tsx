"use client";

import { useState, useEffect, useRef } from "react";

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

type DocumentEntry = {
  name: string;
  size: string;
  date: string;
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

const inlineDocs = [
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

const allDocuments: DocumentEntry[] = [
  { name: "Bank_Statement_Aug_2025.pdf", size: "1.43 MB", date: "Feb 09, 2026" },
  { name: "Bank_Statement_Dec_2025.pdf", size: "1.38 MB", date: "Feb 09, 2026" },
  { name: "Bank_Statement_Jan_2026.pdf", size: "1.51 MB", date: "Feb 09, 2026" },
  { name: "Bank_Statement_Nov_2025.pdf", size: "1.40 MB", date: "Feb 09, 2026" },
  { name: "Bank_Statement_Oct_2025.pdf", size: "1.35 MB", date: "Feb 09, 2026" },
  { name: "Bank_Statement_Sep_2025.pdf", size: "1.42 MB", date: "Feb 09, 2026" },
  { name: "Tax_Return_2025.pdf", size: "2.10 MB", date: "Jan 22, 2026" },
  { name: "Business_License.pdf", size: "0.85 MB", date: "Jan 15, 2026" },
  { name: "Financial_Projections_Q1.xlsx", size: "0.64 MB", date: "Jan 10, 2026" },
  { name: "UW_Report_Final.pdf", size: "3.20 MB", date: "Feb 20, 2026" },
];

function DocumentsPopup({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="popup-container"
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="popup-header">
          <div className="popup-title-area">
            <div className="popup-drive-icon">
              <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
                <path
                  d="M6.67 0L0 12l3.33 6h13.34L20 12 13.33 0H6.67zM13 2l5 8.5h-4.5L8.5 2H13zM7 2.5l5 8.5H2l5-8.5zM2.5 12h10l2.5 4H5l-2.5-4z"
                  fill="#f8dc7a"
                />
              </svg>
            </div>
            <div>
              <h2>Google Drive</h2>
              <span className="popup-breadcrumb">
                Root Folder <span className="popup-sep">/</span> 88
              </span>
            </div>
          </div>
          <div className="popup-header-actions">
            <button type="button" className="popup-icon-btn" aria-label="Refresh">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
            </button>
            <button type="button" className="popup-upload-btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Upload
            </button>
            <button type="button" className="popup-icon-btn popup-more" aria-label="More options">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </button>
            <button type="button" className="popup-close-btn" onClick={onClose} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <div className="popup-doc-list">
          {allDocuments.map((doc) => (
            <article className="popup-doc-row" key={doc.name}>
              <div className="popup-doc-info">
                <span className="popup-file-icon">
                  <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                    <path
                      d="M2 0C.9 0 0 .9 0 2v14c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6l-6-6H2z"
                      fill="#2a2619"
                    />
                    <path d="M10 0v4c0 1.1.9 2 2 2h4L10 0z" fill="#3e3726" />
                    <text x="3" y="14" fontSize="5" fill="#d8b95e" fontWeight="600">
                      PDF
                    </text>
                  </svg>
                </span>
                <div>
                  <p className="popup-doc-name">{doc.name}</p>
                  <span className="popup-doc-detail">
                    {doc.size} &bull; {doc.date}
                  </span>
                </div>
              </div>
              <button type="button" className="popup-dl-btn" aria-label={`Download ${doc.name}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </button>
            </article>
          ))}
        </div>

        <div className="popup-footer">
          <span className="popup-footer-count">{allDocuments.length} documents</span>
          <span className="popup-footer-path">Google Drive / Root Folder / 88</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [docsOpen, setDocsOpen] = useState(false);

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <div className="logo">OM</div>
        <nav className="side-icons">
          {Array.from({ length: 10 }).map((_, index) => (
            <button
              type="button"
              key={`side-icon-${index}`}
              className={`icon-btn ${index === 2 ? "active" : ""}`}
              aria-label={`sidebar control ${index + 1}`}
            />
          ))}
        </nav>
        <button type="button" className="profile-dot" aria-label="profile" />
      </aside>

      <div className="dashboard-main">
        <header className="topbar">
          <div className="brand-line">Opportunity Management</div>
          <div className="top-actions">
            <button type="button" className="pill active">AI Agent</button>
            <button type="button" className="pill">Calculator</button>
            <button
              type="button"
              className={`pill${docsOpen ? " docs-active" : ""}`}
              onClick={() => setDocsOpen(true)}
            >
              Documents
            </button>
            <button type="button" className="pill">Investigator</button>
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
                <button type="button" className="upload-btn">Upload</button>
              </div>
              <div className="doc-list">
                {inlineDocs.map((doc) => (
                  <article className="doc-item" key={doc}>
                    <div className="doc-meta">
                      <span className="doc-icon" />
                      <div>
                        <p>{doc}</p>
                        <span>1.43 MB • Feb 09, 2026</span>
                      </div>
                    </div>
                    <button type="button" aria-label={`download ${doc}`} className="mini-btn" />
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
