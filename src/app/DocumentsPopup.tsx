"use client";

import { useEffect, useRef } from "react";

type DocumentEntry = {
  name: string;
  size: string;
  date: string;
};

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

export default function DocumentsPopup({ onClose }: { onClose: () => void }) {
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
            <button className="popup-icon-btn" aria-label="Refresh">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
            </button>
            <button className="popup-upload-btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Upload
            </button>
            <button className="popup-icon-btn popup-more" aria-label="More options">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </button>
            <button className="popup-close-btn" onClick={onClose} aria-label="Close">
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
              <button className="popup-dl-btn" aria-label={`Download ${doc.name}`}>
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
