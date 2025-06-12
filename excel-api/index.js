
const express = require('express');
const ExcelJS = require('exceljs');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.get('/api/excel', async (req, res) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Excel Sheet');

    worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Naam', key: 'name', width: 30 },
        { header: 'Age', key: 'age', width: 10 },
    ];

    worksheet.addRows([
        { id: 1, name: 'komal', age: 20 },
        { id: 2, name: 'kittu', age: 28 },
        { id: 3, name: 'pooja', age: 25 }
    ]);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="komal-data.xlsx"');

    await workbook.xlsx.write(res);
    res.end();
});

app.listen(port, () => {
    console.log(`✅ backend chal gaya: http://localhost:${port}/api/excel`);
});
