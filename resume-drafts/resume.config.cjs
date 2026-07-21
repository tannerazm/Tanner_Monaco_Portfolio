module.exports = {
  pdf_options: {
    format: "Letter",
    margin: {
      top: "0.3in",
      right: "0.45in",
      bottom: "0.25in",
      left: "0.45in",
    },
    printBackground: true,
  },
  css: `
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 9.5pt;
      line-height: 1.3;
      color: #1a1a1a;
    }
    h1 {
      font-size: 20pt;
      margin: 0 0 2px 0;
      line-height: 1.05;
    }
    h2 {
      font-size: 11.5pt;
      margin: 6px 0 2px 0;
      padding-bottom: 1px;
      border-bottom: 1px solid #ddd;
      letter-spacing: -0.01em;
    }
    h3 {
      font-size: 10.5pt;
      margin: 6px 0 2px 0;
    }
    p {
      margin: 0 0 2px 0;
    }
    ul {
      margin: 1px 0 3px 0;
      padding-left: 15px;
    }
    li {
      margin: 0;
      line-height: 1.3;
    }
    a {
      color: #841617;
      text-decoration: none;
    }
    em {
      color: #555;
    }
    strong {
      color: #1a1a1a;
    }
  `,
};
