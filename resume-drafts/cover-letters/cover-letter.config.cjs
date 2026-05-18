module.exports = {
  pdf_options: {
    format: "Letter",
    margin: {
      top: "0.85in",
      right: "0.9in",
      bottom: "0.85in",
      left: "0.9in",
    },
    printBackground: true,
  },
  css: `
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.5;
      color: #1a1a1a;
    }
    h1 {
      font-size: 22pt;
      margin: 0 0 4px 0;
      line-height: 1.1;
      letter-spacing: -0.01em;
    }
    h1 + p {
      margin-top: 2px;
      color: #444;
      font-size: 10.5pt;
    }
    p {
      margin: 0 0 12px 0;
    }
    p strong:only-child {
      display: inline-block;
      margin-top: 6px;
    }
    a {
      color: #841617;
      text-decoration: none;
    }
    strong {
      color: #1a1a1a;
    }
  `,
};
