const blogContext = require.context("../blogs", false, /\.md$/);

const blogFiles = Object.fromEntries(
    blogContext.keys().map((key) => {
        const slug = key.replace(/^\.\//, "").replace(/\.md$/, "");
        const mod = blogContext(key);
        return [slug, mod.default || mod];
    })
);

function createTable(tableData) {
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');

    tableData.forEach(function(rowData) {
        var row = document.createElement('tr');

        rowData.forEach(function(cellData) {
            var cell = document.createElement('td');
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    document.body.appendChild(table);
}

createTable(blogFiles);