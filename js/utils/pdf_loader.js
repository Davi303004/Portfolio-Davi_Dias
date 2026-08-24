let pdfjsLib;

export async function loadPdfJs(){
     if (pdfjsLib) {
        return pdfjsLib;
    }

    pdfjsLib = await import(
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs'
    );

    pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs';

    return pdfjsLib;
}