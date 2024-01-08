
// Display.js
import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import '../Styles/Body.css';

function Display({ data }) {
  const lastYearData = data[data.length - 1]; // Get data from the last year

  // Calculate the last year's invested capital plus the current year's investment
  const lastYearInvestedPlusCurrentInvestment =
    lastYearData.investedCapital + data[data.length - 1].investmentValue;

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

      // Add the investment table content to the PDF
      pdf.autoTable({ html: tableRef.current, startY: 20 });

      // Add the inflation table content to the PDF
      pdf.addPage();
      pdf.text('Inflation Table', 10, 10);
      pdf.autoTable({
        head: [['Year', 'Investment Value', 'Interest (year)', 'Total Interest', 'Invested Capital', 'Inflation Adjusted Final Value', 'Inflation']],
        body: data.map((yearData) => [
          yearData.year,
          yearData.investmentValue,
          yearData.interest,
          yearData.totalInterest,
          yearData.investedCapital,
          yearData.inflationAdjustedFinalValue,
          yearData.inflation,
        ]),
      });

      // Save the PDF
      pdf.save('investment_and_inflation_tables.pdf');
    }
  };

  return (
    <>
      <h2>Investment Table</h2>
      <table ref={tableRef}>
        <thead>
          <tr>
            <th className="table-header">Year</th>
            <th className="table-header">With Inflation</th>
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
      {/* Remove the unnecessary second occurrence */}
    </tr>
  ))}
</tbody>

      </table>
      <button className='download' onClick={downloadPDF}>Download PDF</button>
    </>
  );
}

export default Display;

// // Display.js
// import React, { useRef } from 'react';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';
// import '../Styles/Body.css';

// function Display({ data }) {
//   const lastYearData = data[data.length - 2]; // Get data from the last year

//   // Calculate the last year's invested capital plus the current year's investment
//   const lastYearInvestedPlusCurrentInvestment =
//     lastYearData.investedCapital + data[data.length - 1].investmentValue;

//   const tableRef = useRef(null);

//   const addWatermark = (pdf, text, interval) => {
//     pdf.setFontSize(12);
//     pdf.setTextColor(200, 200, 200); // Set color to light gray
//     const pageWidth = pdf.internal.pageSize.width;
//     const pageHeight = pdf.internal.pageSize.height;

//     for (let x = 0; x < pageWidth; x += interval) {
//       for (let y = 0; y < pageHeight; y += interval) {
//         pdf.text(text, x, y);
//       }
//     }
//   };

//   const downloadPDF = () => {
//     if (tableRef.current) {
//       // Create a new jsPDF instance
//       const pdf = new jsPDF();

//       // Add watermark every 100 pixels
//       const watermarkText = 'Chinmaya';
//       const watermarkInterval = 40;

//       addWatermark(pdf, watermarkText, watermarkInterval);

//       // Add the table content to the PDF
//       pdf.autoTable({ html: tableRef.current });

//       // Save the PDF
//       pdf.save('investment_table.pdf');
//     }
//   };

//   return (
//     <>
//       <h2>Investment Table</h2>
//       <table ref={tableRef}>
//         <thead>
//           <tr>
//             <th className="table-header">Year</th>
//             <th className="table-header">Investment Value</th>
//             <th className="table-header">Interest (year)</th>
//             <th className="table-header">Total Interest</th>
//             <th className="table-header">Invested Capital</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.slice(1).map((yearData, index) => (
//             <tr key={index}>
//               <td className="table-cell">{yearData.year - 1}</td>
//               <td className="table-cell">{yearData.investmentValue}</td>
//               <td className="table-cell">{yearData.interest}</td>
//               <td className="table-cell">{yearData.totalInterest}</td>
//               <td className="table-cell">{yearData.investedCapital}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button className='download' onClick={downloadPDF}>Download PDF</button>

//     </>
//   );
// }

// export default Display;
