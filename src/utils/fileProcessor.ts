import * as PDFJS from 'pdfjs-dist';
import mammoth from 'mammoth';

// Initialize PDF.js worker
PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.mjs`;

export type ProcessFileResult = {
  text: string;
  fileName: string;
  fileType: string;
  error?: string;
};

export const processPdfFile = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFJS.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }

    return fullText.trim();
  } catch (error) {
    console.error('Error processing PDF:', error);
    throw new Error('Failed to process PDF file');
  }
};

export const processDocFile = async (file: File): Promise<string> => {
  try {
    const buffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({
      arrayBuffer: buffer,
    });
    return result.value;
  } catch (error) {
    console.error('Error processing DOC/DOCX:', error);
    throw new Error('Failed to process DOC/DOCX file');
  }
};

export const processFile = async (file: File): Promise<ProcessFileResult> => {
  try {
    const fileType = file.type;
    let text = '';

    if (fileType === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
      text = await processPdfFile(file);
    } else if (
      fileType === 'application/msword' ||
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.name.toLowerCase().endsWith('.doc') ||
      file.name.toLowerCase().endsWith('.docx')
    ) {
      text = await processDocFile(file);
    } else {
      throw new Error('Unsupported file type');
    }

    return {
      text,
      fileName: file.name,
      fileType: file.type,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        text: '',
        fileName: file.name,
        fileType: file.type,
        error: error.message,
      };
    }
    return {
      text: '',
      fileName: file.name,
      fileType: file.type,
      error: 'Unknown error processing file',
    };
  }
};