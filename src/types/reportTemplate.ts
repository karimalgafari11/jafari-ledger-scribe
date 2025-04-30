
export interface ReportTemplate {
  id?: string;
  name: string;
  description: string;
  type: string;
  content: ReportTemplateContent;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ReportTemplateContent {
  header: ReportSectionContent;
  body: ReportSectionContent;
  footer: ReportSectionContent;
  settings: ReportTemplateSettings;
}

export interface ReportSectionContent {
  elements: ReportElement[];
}

export interface ReportElement {
  id: string;
  type: 'text' | 'image' | 'table' | 'chart';
  properties: Record<string, any>;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface ReportTemplateSettings {
  pageSize: 'A4' | 'A5' | 'Letter';
  orientation: 'portrait' | 'landscape';
  margins: { top: number; right: number; bottom: number; left: number };
  showPageNumbers: boolean;
  headerHeight: number;
  footerHeight: number;
}
