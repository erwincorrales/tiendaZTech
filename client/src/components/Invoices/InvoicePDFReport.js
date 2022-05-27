import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const marginLeft = 15;

export const createReport = (invoices, id) => {
  const invoice = invoices?.find((invoice) => invoice?.id === id);
  const articleList = JSON.parse(invoice?.arrayItems || []);
  const totalArticles = articleList?.reduce((acc, current) => {
    acc += parseInt(current?.cant);
    return acc;
  }, 0);

  const tableData = articleList?.map(
    ({ id, cant, brand, price, description }) => [
      cant,
      id,
      brand,
      description,
      `$${price}`,
      `$${cant * price}`,
    ]
  );

  // DOC
  const pdfDoc = new jsPDF();
  pdfDoc.setFontSize(20).text("e1maxTienda", marginLeft, 30);
  pdfDoc
    .setFontSize(12)
    .text(`Invoice number: ${invoice?.id}`, marginLeft, 40)
    .text(invoice?.date, marginLeft, 45);
  pdfDoc.setFontSize(12).text(`Customer: `, marginLeft, 60);
  pdfDoc
    .setFontSize(15)
    .text(`${invoice?.userId} -- ${invoice?.name}`, marginLeft, 65);

  pdfDoc.setFontSize(12).text(`Articles: ${totalArticles}`, marginLeft, 80);
  let heightAfterTable = 0;
  autoTable(pdfDoc, {
    startY: 100,
    head: [["CANT", "ID", "BRAND", "DESCRIPTION", "PRICE", "SUBTOTAL"]],
    body: tableData,
    didDrawPage: (d) => (heightAfterTable = d.cursor.y),
  });

  pdfDoc
    .text(`Amount: `, marginLeft, heightAfterTable + 10)
    .setFontSize(15)
    .text(`$ ${invoice?.amount}`, marginLeft + 20, heightAfterTable + 10)
    .setFontSize(10)
    .text(
      `© e1maxSystems ${new Date().getFullYear()}`,
      marginLeft,
      heightAfterTable + 50
    );

  const pdfBytes = pdfDoc.save(
    `e1maxTienda-${invoice?.id}-${invoice?.name}.pdf`
  );
  download(pdfBytes);
};
