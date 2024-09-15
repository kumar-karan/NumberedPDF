// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const { jsPDF } = window.jspdf;

    const pdfForm = document.getElementById('pdfForm');
    const errorDiv = document.getElementById('error');

    pdfForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form submission

        // Clear previous error
        errorDiv.textContent = '';

        // Get user inputs
        const pages = parseInt(document.getElementById('pages').value);
        const format = document.getElementById('format').value;
        const position = document.getElementById('position').value;
        const fontSize = parseInt(document.getElementById('fontSize').value);

        // Validate input
        if (isNaN(pages) || pages < 1) {
            errorDiv.textContent = 'Please enter a valid number of pages (minimum 1).';
            return;
        }

        if (isNaN(fontSize) || fontSize < 6 || fontSize > 72) {
            errorDiv.textContent = 'Please enter a valid font size (between 6 and 72).';
            return;
        }

        // Create a new jsPDF instance
        const doc = new jsPDF();

        for (let i = 1; i <= pages; i++) {
            if (i > 1) {
                doc.addPage();
            }

            // Get page dimensions
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();

            // Define the page number text based on the format
            let pageNumberText;
            if (format === 'pageX') {
                pageNumberText = `Page ${i}`;
            } else if (format === 'xOfY') {
                pageNumberText = `${i} of ${pages}`;
            } else {
                pageNumberText = `${i}`;
            }

            // Calculate position for the page number
            let x, y;
            const textWidth = doc.getTextWidth(pageNumberText);

            switch (position) {
                case 'top-left':
                    x = 10;
                    y = 20;
                    break;
                case 'top-right':
                    x = pageWidth - textWidth - 10;
                    y = 20;
                    break;
                case 'bottom-left':
                    x = 10;
                    y = pageHeight - 10;
                    break;
                case 'bottom-right':
                    x = pageWidth - textWidth - 10;
                    y = pageHeight - 10;
                    break;
                case 'bottom-center':
                    x = (pageWidth - textWidth) / 2;
                    y = pageHeight - 10;
                    break;
            }

            // Add the page number with the specified font size
            doc.setFontSize(fontSize);
            doc.text(pageNumberText, x, y);
        }

        // Save the PDF
        doc.save('custom_blank_pages_with_numbers.pdf');
    });
});
