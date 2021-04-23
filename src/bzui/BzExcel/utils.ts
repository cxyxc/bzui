import XLSX from "xlsx";

type ExcelToJSONResult = {
  [k: string]: { header: Array<string>; data: Array<unknown> };
};

export const excelToJSON = function (
  file: Blob,
  opts?: XLSX.Sheet2JSONOpts
): Promise<ExcelToJSONResult> {
  return new Promise(function (resolve, reject) {
    try {
      const reader = new FileReader();
      reader.onload = function (ev) {
        const raw = XLSX.read(ev.target?.result, { type: "binary" });
        const result: ExcelToJSONResult = {};
        for (const k in raw.Sheets) {
          const sheet = raw.Sheets[k];
          const header = Object.keys(sheet)
            .map((key) => {
              if (/^[A-Z]+1$/.test(key)) {
                return sheet[key].v;
              } else {
                return null;
              }
            })
            .filter((d) => d);
          result[k] = {
            data: XLSX.utils.sheet_to_json(sheet, opts),
            header,
          };
        }
        resolve(result);
      };
      reader.readAsBinaryString(file);
    } catch (err) {
      reject();
    }
  });
};

export const jsonToExcel = (data: Array<any>, excelName: string) => {
  const sheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");
  XLSX.writeFile(workbook, excelName);
  return;
};
