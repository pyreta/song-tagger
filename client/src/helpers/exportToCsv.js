const processRow = row => {
  let finalVal = '';
  for (let j = 0; j < row.length; j++) {
    let innerValue = row[j] === null ? '' : row[j].toString();
    if (row[j] instanceof Date) {
      innerValue = row[j].toLocaleString();
    }
    let result = innerValue.replace(/"/g, '""');
    if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
    if (j > 0) finalVal += ',';
    finalVal += result;
  }
  return finalVal + '\n';
};

const exportToCsv = (filename, rows) => {
  let csvFile = '';
  for (let i = 0; i < rows.length; i++) {
    csvFile += processRow(rows[i]);
  }

  const blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, filename);
  } else {
    var link = document.createElement('a');
    if (link.download !== undefined) {
      var url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};

export default exportToCsv;
