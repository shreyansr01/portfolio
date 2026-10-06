import { useEffect, useState, memo, type FC } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, FileText, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pdfPath: string;
  downloadName: string;
  downloadLabel?: string;
  defaultZoom?: number | string;
  newTabZoom?: number | string;
  containerClassName?: string;
}

const PdfModal: FC<PdfModalProps> = ({
  isOpen,
  onClose,
  title,
  pdfPath,
  downloadName,
  downloadLabel,
  defaultZoom,
  newTabZoom = 98,
  containerClassName,
}) => {
  const [isPdfSupported, setIsPdfSupported] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');

  // Lock body scroll when modal is open and cleanly restore when closed
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    setIsPdfSupported(true);
    const zoomParam = defaultZoom ? `#zoom=${defaultZoom}` : '#view=FitH';
    setPdfUrl(`${pdfPath}${zoomParam}`);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = previousBodyOverflow || '';
    };
  }, [isOpen, onClose, pdfPath, defaultZoom]);

  // Robust, reliable download via fetch + Blob with fallback
  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      const response = await fetch(pdfPath);
      if (!response.ok) throw new Error('Network fetch failed');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = downloadName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2000);
    } catch {
      // Fallback direct anchor click
      const link = document.createElement('a');
      link.href = pdfPath;
      link.download = downloadName;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2000);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleOpenInNewTab = () => {
    const zoomParam = newTabZoom ? `#zoom=${newTabZoom}` : '#zoom=98';
    window.open(`${pdfPath}${zoomParam}`, '_blank', 'noopener,noreferrer');
  };

  const handlePdfError = () => {
    setIsPdfSupported(false);
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div
          className={cn(
            "fixed inset-0 z-[100] flex items-center justify-center p-3 pt-12 pb-3 sm:p-4 sm:pt-16 sm:pb-6 md:pt-8 md:pb-24",
            containerClassName
          )}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container - Responsive, touch-friendly, and ergonomically sized */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 bg-warm-900 border border-black/10 dark:border-white/10 rounded-xl sm:rounded-2xl w-[94%] max-w-[440px] sm:max-w-[760px] sm:w-full h-[70vh] sm:h-[80vh] max-h-[580px] sm:max-h-[740px] min-h-[380px] sm:min-h-[460px] flex flex-col shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 sm:px-4.5 sm:py-3 border-b border-black/10 dark:border-white/10 bg-warm-800 shrink-0">
              <div className="flex items-center gap-2 min-w-0 pr-2">
                <div className="p-1 rounded-md bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-warm-300 shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <h2 className="text-sm sm:text-[15px] font-heading font-semibold text-warm-100 tracking-tight truncate">
                  {title}
                </h2>
              </div>

              {/* Top Quick Actions with Tooltips */}
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="relative group/tooltip">
                  <button
                    type="button"
                    onClick={handleOpenInNewTab}
                    className="group/btn p-1.5 rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.04] dark:bg-white/[0.04] text-warm-300 hover:bg-warm-100 dark:hover:bg-white hover:text-warm-950 dark:hover:text-black hover:border-warm-100 dark:hover:border-white transition-all duration-200 active:scale-95"
                    aria-label="Open PDF in new tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-warm-300 group-hover/btn:text-warm-950 dark:group-hover/btn:text-black transition-colors duration-200" />
                  </button>
                  <div className="hidden sm:block absolute right-0 top-full mt-1.5 opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity duration-150 z-50">
                    <div className="px-2 py-0.5 rounded bg-warm-800 border border-black/15 dark:border-white/15 text-[10px] font-mono text-warm-300 shadow-xl whitespace-nowrap">
                      Open in new tab
                    </div>
                  </div>
                </div>

                <div className="relative group/tooltip">
                  <button
                    type="button"
                    onClick={onClose}
                    className="group/btn p-1.5 rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.04] dark:bg-white/[0.04] text-warm-300 hover:bg-warm-100 dark:hover:bg-white hover:text-warm-950 dark:hover:text-black hover:border-warm-100 dark:hover:border-white transition-all duration-200 active:scale-95"
                    aria-label="Close modal"
                  >
                    <X className="w-3.5 h-3.5 text-warm-300 group-hover/btn:text-warm-950 dark:group-hover/btn:text-black transition-colors duration-200" />
                  </button>
                  <div className="hidden sm:block absolute right-0 top-full mt-1.5 opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity duration-150 z-50">
                    <div className="px-2 py-0.5 rounded bg-warm-800 border border-black/15 dark:border-white/15 text-[10px] font-mono text-warm-300 shadow-xl whitespace-nowrap">
                      Close (Esc)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Viewer Body */}
            <div className="relative flex-1 min-h-0 bg-warm-950 overflow-hidden">
              {isPdfSupported ? (
                pdfUrl && (
                  <iframe
                    src={pdfUrl}
                    className="w-full h-full border-none bg-warm-950"
                    title={`${title} Preview`}
                    onError={handlePdfError}
                  />
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center p-6 bg-warm-950">
                  <div className="text-center max-w-sm">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-3 text-emerald-400">
                      <FileText className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-semibold text-warm-100 mb-1">
                      PDF Preview Unavailable
                    </h3>
                    <p className="text-xs text-warm-500 mb-4 leading-relaxed font-mono">
                      Your browser does not support inline PDF viewing. Please download the document to view it.
                    </p>
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1 rounded-full border sm:border-2 border-emerald-500/40 text-emerald-400 bg-transparent hover:border-emerald-600 font-mono text-xs font-medium transition-all duration-200 touch-manipulation"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download PDF
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-2.5 px-3 py-2 sm:px-4.5 sm:py-2.5 border-t border-black/10 dark:border-white/10 bg-warm-800 shrink-0">
              {/* Document Filename Meta - Full name displayed without premature cutoff */}
              <div className="flex items-center gap-1 min-w-0 flex-1">
                <span className="text-[10.5px] sm:text-xs font-mono text-warm-500 truncate select-all">
                  {downloadName}
                </span>
              </div>

              {/* Action Button */}
              <div className="flex items-center shrink-0">
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className={`group inline-flex items-center justify-center gap-1.5 h-7 sm:h-7 px-2.5 sm:px-3.5 rounded-full text-[11px] sm:text-xs font-mono font-medium transition-all duration-200 border sm:border-2 bg-transparent whitespace-nowrap touch-manipulation ${
                    downloadSuccess
                      ? 'border-emerald-500/60 text-emerald-400'
                      : 'border-emerald-500/40 text-emerald-400 hover:border-emerald-600'
                  }`}
                  aria-label={downloadLabel || 'Download PDF'}
                >
                  {isDownloading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400 shrink-0" />
                  ) : downloadSuccess ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <Download className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  )}
                  <span>
                    {isDownloading
                      ? 'Saving...'
                      : downloadSuccess
                      ? 'Downloaded'
                      : downloadLabel || 'Download PDF'}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(modalContent, document.body);
};

export default memo(PdfModal);
