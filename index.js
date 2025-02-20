const { searchGoogle } = require("./automate.js");
const xls = require("xlsx");
const workbook = xls.readFile("Excel Nodejs.xlsx");
const { sendSimpleMessage } = require("./sendCompletionMail.js");
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const range = xls.utils.decode_range(sheet["!ref"]);

try {
  (async () => {
    for (let i = range.s.r + 1; i <= range.e.r; i++) {
      for (let j = range.s.c; j <= range.e.c; j++) {
        const cellAddress = { c: j, r: i };
        const cellRef = xls.utils.encode_cell(cellAddress);
        const cell = sheet[cellRef];
        if (cell) {
          if (cellRef.substring(0, 1) === "A") {
            let product = cell.v;
            let { salesPrice, pdpPrice, drOnSearch, drOnPDP } =
              await searchGoogle(product);

            // console.log(typeof drOnSearch, typeof drOnPDP);
            sheet[`C${i + 1}`] = { v: salesPrice };
            sheet[`D${i + 1}`] = { v: pdpPrice };
            sheet[`G${i + 1}`] = { v: drOnSearch };
            sheet[`H${i + 1}`] = { v: drOnPDP };
          }
          if (cellRef.substring(0, 1) === "B") {
            let price = cell.v;
            if (
              price === sheet[`C${i + 1}`].v &&
              price === sheet[`D${i + 1}`].v
            ) {
              sheet[`E${i + 1}`] = { v: "Yes" };
            } else {
              sheet[`E${i + 1}`] = { v: "No" };
            }
          }
          if (cellRef.substring(0, 1) === "F") {
            let dr = cell.v;
            if (dr === sheet[`G${i + 1}`].v && dr === sheet[`H${i + 1}`].v) {
              sheet[`I${i + 1}`] = { v: "Yes" };
            } else {
              sheet[`I${i + 1}`] = { v: "No" };
            }
          }
          xls.writeFile(workbook, "Excel Nodejs.xlsx");
        }
      }
    }
  })();
} catch (e) {
  console.log(e);
} finally {
  (async () => {
    await sendSimpleMessage();
  })();
}
