const params = new URLSearchParams(window.location.search);
const postSlug = params.get("post");

if (postSlug) {
    // Load single blog post markdown
    fetch(`./blogs/${postSlug}.md`)
        .then(res => {
            if (!res.ok) throw new Error("Blog not found");
            return res.text();
        })
        .then(rawMd => {
            // Strip --- frontmatter --- before rendering markdown
            const match = rawMd.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
            let title = postSlug;
            let date = "";
            let body = rawMd;

            if (match) {
                body = match[2];
                match[1].split(/\r?\n/).forEach(line => {
                    const colonIdx = line.indexOf(":");
                    if (colonIdx !== -1) {
                        const key = line.slice(0, colonIdx).trim();
                        const val = line.slice(colonIdx + 1).trim();
                        if (key === "title") title = val;
                        if (key === "date") date = val;
                    }
                });
            }

            document.getElementById("content").innerHTML = `
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div style="margin: 0;"><h2>${title}</h2></div>
                                    <div><p>${date}</p></div>
                                </div>
                                <md-block>${body}</md-block>
                            `;
        })
        .catch(() => {
            document.getElementById("content").innerHTML = `<br>Blog not found.</p>`;
        });
} else {
    // Load blog list from RSS feed.xml
    fetch("./feed.xml")
        .then(res => res.text())
        .then(xmlText => {
            const xml = new DOMParser().parseFromString(xmlText, "text/xml");
            const items = xml.querySelectorAll("item");
            const bloglist = document.getElementById("bloglist");

            items.forEach(item => {
                const title = item.querySelector("title")?.textContent || "";
                const link = item.querySelector("link")?.textContent || "";
                const date = item.querySelector("pubDate")?.textContent || "";

                const row = document.createElement("tr");
                const colTitle = document.createElement("td");
                colTitle.innerHTML = `<a href="${link}">${title}</a>`;
                const colDate = document.createElement("td");
                colDate.textContent = `${date}`;

                row.appendChild(colTitle);
                row.appendChild(colDate);

                bloglist.appendChild(row);
            });
        });
}