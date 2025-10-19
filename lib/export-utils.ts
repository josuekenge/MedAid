import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Type definition for jspdf-autotable
interface AutoTableOptions {
  head?: string[][];
  body?: string[][];
  startY?: number;
  styles?: {
    fontSize?: number;
    cellPadding?: number;
  };
  headStyles?: {
    fillColor?: number[];
    textColor?: number;
    fontStyle?: string;
  };
  alternateRowStyles?: {
    fillColor?: number[];
  };
  margin?: {
    top?: number;
  };
}

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: AutoTableOptions) => jsPDF;
  }
}

export interface ExportOptions {
  filename?: string;
  sheetName?: string;
  includeHeaders?: boolean;
  dateFormat?: string;
}

export interface ExportData {
  [key: string]: any;
}

// CSV Export
export function exportToCSV(
  data: ExportData[],
  filename: string = 'export.csv',
  options: ExportOptions = {}
) {
  if (!data || data.length === 0) {
    throw new Error('No data to export');
  }

  const { includeHeaders = true } = options;
  
  // Get headers from first object
  const headers = includeHeaders ? Object.keys(data[0]) : [];
  
  // Create CSV content
  let csvContent = '';
  
  if (includeHeaders) {
    csvContent += headers.join(',') + '\n';
  }
  
  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header];
      // Handle null/undefined values
      if (value === null || value === undefined) return '';
      // Escape commas and quotes in values
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    });
    csvContent += values.join(',') + '\n';
  });
  
  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Excel Export
export function exportToExcel(
  data: ExportData[],
  filename: string = 'export.xlsx',
  options: ExportOptions = {}
) {
  if (!data || data.length === 0) {
    throw new Error('No data to export');
  }

  const { sheetName = 'Sheet1' } = options;
  
  // Create workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  
  // Generate and download file
  XLSX.writeFile(workbook, filename);
}

// PDF Export
export function exportToPDF(
  data: ExportData[],
  filename: string = 'export.pdf',
  options: ExportOptions = {}
) {
  if (!data || data.length === 0) {
    throw new Error('No data to export');
  }

  const { includeHeaders = true } = options;
  
  // Create new PDF document
  const doc = new jsPDF();
  
  // Get headers from first object
  const headers = includeHeaders ? Object.keys(data[0]) : [];
  
  // Prepare data for autoTable
  const tableData = data.map(row => 
    headers.map(header => {
      const value = row[header];
      if (value === null || value === undefined) return '';
      if (value instanceof Date) {
        return value.toLocaleDateString();
      }
      return String(value);
    })
  );
  
  // Add table to PDF
  doc.autoTable({
    head: includeHeaders ? [headers] : [],
    body: tableData,
    startY: 20,
    styles: {
      fontSize: 8,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [59, 130, 246], // Blue color
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252], // Light gray
    },
    margin: { top: 20 },
  } as AutoTableOptions);
  
  // Save the PDF
  doc.save(filename);
}

// Generic export function
export function exportData(
  data: ExportData[],
  format: 'csv' | 'excel' | 'pdf',
  filename?: string,
  options: ExportOptions = {}
) {
  const defaultFilename = `medaid-export-${new Date().toISOString().split('T')[0]}`;
  const finalFilename = filename || defaultFilename;
  
  switch (format) {
    case 'csv':
      exportToCSV(data, `${finalFilename}.csv`, options);
      break;
    case 'excel':
      exportToExcel(data, `${finalFilename}.xlsx`, options);
      break;
    case 'pdf':
      exportToPDF(data, `${finalFilename}.pdf`, options);
      break;
    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
}

// Utility function to format data for export
export function formatDataForExport(
  data: any[],
  columnMapping?: { [key: string]: string }
) {
  if (!data || data.length === 0) return [];
  
  return data.map(item => {
    const formattedItem: any = {};
    
    Object.keys(item).forEach(key => {
      const displayKey = columnMapping?.[key] || key;
      let value = item[key];
      
      // Format dates
      if (value instanceof Date) {
        value = value.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      }
      
      // Format arrays
      if (Array.isArray(value)) {
        value = value.join(', ');
      }
      
      // Format objects
      if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
        value = JSON.stringify(value);
      }
      
      formattedItem[displayKey] = value;
    });
    
    return formattedItem;
  });
}
