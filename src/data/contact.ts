// Single source of truth for any of Tanner's contact info that appears in
// more than one place on the site. If something here changes (new phone,
// moved cities, new socials), edit it here.
export const CONTACT = {
  name: "Tanner Monaco",
  phone: "(303) 472-9342",
  phoneHref: "tel:303-472-9342",
  email: "tannermonaco@gmail.com",
  emailHref: "mailto:tannermonaco@gmail.com",
  location: "Stillwater, OK",
  linkedin: "https://www.linkedin.com/in/tannerazm/",
  github: "https://github.com/tannerazm",
} as const;

export type Contact = typeof CONTACT;
