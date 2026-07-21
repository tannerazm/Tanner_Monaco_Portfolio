# Email templates

These two HTML files are **reference copies**. Editing them does not change any email that actually gets sent.

The live template bodies live in the EmailJS dashboard. `src/pages/Contact.tsx` only sends a template ID and a bag of variables:

```
emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE_TO_SELF, { message, from_first_name, ... })
```

The HTML never leaves the browser.

## Which file maps to which template

Service: `service_uls9257` (constants live at the top of `src/pages/Contact.tsx`)

| File | Template ID | Constant | Goes to |
|---|---|---|---|
| `notification.html` | `template_mz33k3g` | `EMAILJS_TEMPLATE_TO_SELF` | Tanner, on every form submit |
| `auto-reply.html` | `template_n4wjd5j` | `EMAILJS_TEMPLATE_AUTOREPLY` | The person who filled out the form |

## Changing an email

1. Edit the file here.
2. Open the EmailJS dashboard, go to Email Templates, open the matching template ID above.
3. Paste the file's contents into the template's HTML/code view and save.
4. Send a test to confirm it renders.

Step 3 is the one that actually ships. Skipping it means the repo and the live email quietly disagree.

## Variables the templates can use

All six are sent to both templates, so either one can reference any of them:

`{{message}}`, `{{from_first_name}}`, `{{from_last_name}}`, `{{from_email_id}}`, `{{from_phone_number}}`, `{{from_company}}`

`from_phone_number` and `from_company` fall back to the literal string `(not provided)` when the user leaves them blank, so a template can print them unconditionally.

## Gotchas

- **The header logo is a live URL** (`https://tannermonaco.com/favicon-192x192.png`), loaded from the recipient's inbox. If the domain changes, that image breaks in every email already sent. Check it returns HTTP 200 after any domain change.
- **Site URL appears in both the link text and the `href`.** Change both.
- Layout is table-based with inline styles on purpose. Many email clients strip `<style>` blocks, so the `@media` block at the top is a progressive enhancement only, never the sole source of a style that matters.
