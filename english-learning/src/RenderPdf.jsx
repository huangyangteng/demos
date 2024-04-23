import { useState, useImperativeHandle, forwardRef } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url
).toString()
function RenderPdf(props, ref) {
    const [totalPages, setTotalPages] = useState()
    const [pageNumber, setPageNumber] = useState(1)
    function onDocumentLoadSuccess({ numPages }) {
        setTotalPages(numPages)
    }
    const next = () => {
        if (pageNumber + 1 >= totalPages) return
        setPageNumber(pageNumber + 1)
    }
    const prev = () => {
        if (pageNumber - 1 <= 0) return
        setPageNumber(pageNumber - 1)
    }
    const toPage = (page) => {
        if (!page || page <= 1 || page >= totalPages - 1) return
        setPageNumber(page)
    }
    useImperativeHandle(ref, () => ({
        toPage
    }))
    return (
        <div className="pdf-wrapper">
            <Document
                file="https://leexiao.site/file/en.pdf"
                onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
                <div className="page-controls">
                    <button disabled={pageNumber - 1 <= 0} onClick={prev}>
                        ‹
                    </button>
                    <span>
                        {pageNumber} of {totalPages}
                    </span>
                    <button
                        disabled={pageNumber + 1 >= totalPages}
                        onClick={next}>
                        ›
                    </button>
                </div>
            </Document>
        </div>
    )
}

export default forwardRef(RenderPdf)
