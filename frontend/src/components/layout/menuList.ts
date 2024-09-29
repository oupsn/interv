import { SquarePen, LucideIcon, Layers, Code, Video } from "lucide-react"

type Submenu = {
  href: string
  label: string
  active: boolean
}

type Menu = {
  href: string
  label: string
  active: boolean
  icon: LucideIcon
  submenus: Submenu[]
}

type Group = {
  groupLabel: string
  menus: Menu[]
}

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "Workspace",
      menus: [
        {
          href: "/portal/workspace",
          label: "Workspaces",
          active: pathname.includes("/portal/workspace"),
          icon: Layers,
          submenus: [],
        },
        {
          href: "/portal/workspace/create",
          label: "Create",
          active: pathname.includes("/portal/workspace/create"),
          icon: SquarePen,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Assessment",
      menus: [
        {
          href: "",
          label: "Video",
          active: pathname.includes("/portal/assessment/video"),
          icon: Video,
          submenus: [
            {
              href: "/portal/assessment/video",
              label: "Video Assessments",
              active: pathname === "/portal/assessment/video",
            },
            {
              href: "/portal/assessment/video/create",
              label: "Create",
              active: pathname === "/portal/assessment/video/create",
            },
          ],
        },
        {
          href: "",
          label: "Coding",
          active: pathname.includes("/coding"),
          icon: Code,
          submenus: [
            {
              href: "/portal/assessment/coding",
              label: "Coding assessments",
              active: pathname === "/portal/assessment/coding",
            },
            {
              href: "/portal/assessment/coding/create",
              label: "Create",
              active: pathname === "/portal/assessment/coding/create",
            },
          ],
        },
      ],
    },
  ]
}
