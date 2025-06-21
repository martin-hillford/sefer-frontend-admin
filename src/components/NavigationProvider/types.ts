export interface Group {
  id: string,
  name: { en: string, nl: string},
  icon: "stats" | "education" | "pencil" | "user" | "file" | "grid" | "settings" | "message" | "home" | "logout",
  href? : string,
  links? : Link[]
  location: "up" | "down"
}

export interface Link {
  href: string,
  name: { en: string, nl: string},
}
