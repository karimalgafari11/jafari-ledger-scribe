
import React from "react";

export const TableStyles: React.FC = () => {
  return (
    <style>
      {`
      .table-bordered th,
      .table-bordered td {
        border: 1px solid #e2e8f0;
      }
      .table-sm th,
      .table-sm td {
        padding: 0.5rem;
        font-size: 0.875rem;
      }
      .resize-handle {
        cursor: col-resize;
        border-bottom: 4px solid #cbd5e0;
        border-left: 4px solid #cbd5e0;
        transform: rotate(45deg);
        margin-left: 15px;
        margin-bottom: 10px;
      }
      .table-row-active {
        background-color: rgba(59, 130, 246, 0.05);
      }
      /* تحسين وضوح الخلية النشطة */
      [role="gridcell"]:focus {
        outline: 2px solid #3b82f6;
        outline-offset: -2px;
        background-color: rgba(59, 130, 246, 0.1);
      }
      [aria-selected="true"] {
        background-color: rgba(59, 130, 246, 0.1);
      }
      `}
    </style>
  );
};
