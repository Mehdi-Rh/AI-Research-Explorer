export interface MockPaper {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  year: number;
  topics: string[];
  paperType: 'journal' | 'conference' | 'preprint' | 'workshop';
  publicationVenue: string;
  citations?: number;
  pdfUrl?: string; // Can be mock/placeholder
}
