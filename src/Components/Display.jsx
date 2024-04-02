import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import '../Styles/Body.css';

function Display({ data, userInputData,yourTotalInvested }) {
  const tableRef = useRef(null);

  const addWatermark = (pdf, text, interval) => {
    pdf.setFontSize(12);
    pdf.setTextColor(200, 200, 200); // Set color to light gray
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;

    for (let x = 0; x < pageWidth; x += interval) {
      for (let y = 0; y < pageHeight; y += interval) {
        pdf.text(text, x, y);
      }
    }
  };
const downloadPDF = () => {
  if (tableRef.current) {
    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Add watermark every 100 pixels
    const watermarkText = 'Chinmaya';
    const watermarkInterval = 40;

    addWatermark(pdf, watermarkText, watermarkInterval);

    // Set user input styling
    pdf.setTextColor(47, 83, 155);
    // Red color
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold'); // Bold and stylish font
    pdf.text(`Initial Investment: ${userInputData.initial}`, 10, 40);
    pdf.text(`Annual Investment: ${userInputData.annual}`, 10, 50);
    pdf.text(`Expected: ${userInputData.expected}%`, 10, 60);
    pdf.text(`Duration: ${userInputData.duration} year`, 10, 70);
    pdf.text(`Inflation: ${userInputData.inflation}%`, 10, 80);
    pdf.text(`Your Actual Investment: ${yourTotalInvested}`, 10, 90);
    pdf.setTextColor(0, 0, 0); // Reset text color to black
    pdf.setFont('normal'); // Reset font style

    // Add the investment table content to the PDF
    pdf.text('Investment Table', 10, 110);
    pdf.autoTable({
      head: [
        ['Year', 'Investment Value', 'Interest (year)', 'Total Interest', 'Invested Capital', 'Without Inflation'],
      ],
      body: data.map((yearData) => [
        yearData.year,
        yearData.investmentValue,
        yearData.interest,
        yearData.totalInterest,
        yearData.investedCapital,
        yearData.inflationAdjustedFinalValue, // Assuming this field corresponds to "Without Inflation"
      ]),
      startY: 120,
    });

    // Save the PDF
    pdf.save('MoneyMatter.pdf');
  }
};

  

  return (
    <>
      <h2>Investment Table</h2>
      <p>Your Actual Investment {yourTotalInvested}</p>
      <table ref={tableRef}>
        <thead>
          <tr>
            <th className="table-header">Year</th>
            <th className="table-header">Investment Value</th>
            <th className="table-header">Interest (year)</th>
            <th className="table-header">Total Interest</th>
            <th className="table-header">Invested Capital</th>
            <th className="table-header">Without Inflation</th>
          </tr>
        </thead>
        <tbody>
          {data.map((yearData, index) => (
            <tr key={index}>
              <td className="table-cell">{yearData.year}</td>
              <td className="table-cell">{yearData.investmentValue}</td>
              <td className="table-cell">{yearData.interest}</td>
              <td className="table-cell">{yearData.totalInterest}</td>
              <td className="table-cell">{yearData.investedCapital}</td>
              <td className="table-cell">{yearData.inflationAdjustedFinalValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='download' onClick={downloadPDF}>Download PDF</button>
    </>
  );
}

export default Display;
