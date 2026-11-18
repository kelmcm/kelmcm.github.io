class SiteHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="margin: 0;"><h1>Kelly McManus</h1></div>
                <div >
                    <a href="./home.html">Home</a>
                    <a href="./blogs.html">Blogs</a>
                    <a href="./cv.html">CV</a>
                </div>
            </div>
            
            <div style="clear: both;">
                <hr>
            <div>
            </header>
    `;
    }
}

customElements.define('site-header', SiteHeader);