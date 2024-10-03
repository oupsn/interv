import { LucideIcon, Layers, Code, Video } from "lucide-react"

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
      groupLabel: "",
      menus: [
        {
          href: "/portal/workspace",
          label: "Workspaces",
          active: pathname.includes("/portal/workspace"),
          icon: Layers,
          submenus: [],
        },
      ],
    },
    // {
    //   groupLabel: "Workspace",
    //   menus: [
    //     {
    //       href: "/portal/workspace",
    //       label: "Workspaces",
    //       active: pathname.includes("/portal/workspace"),
    //       icon: Layers,
    //       submenus: [],
    //     },
    //     {
    //       href: "/portal/workspace/create",
    //       label: "Create",
    //       active: pathname.includes("/portal/workspace/create"),
    //       icon: SquarePen,
    //       submenus: [],
    //     },
    //   ],
    // },
    {
      groupLabel: "Question Bank",
      menus: [
        {
          href: "/portal/question/video",
          label: "Video Questions",
          active: pathname.includes("/portal/question/video"),
          icon: Video,
          submenus: [
            // {
            //   href: "/portal/assessment/video",
            //   label: "Video Assessments",
            //   active: pathname === "/portal/assessment/video",
            // },
            // {
            //   href: "/portal/assessment/video/create",
            //   label: "Create",
            //   active: pathname === "/portal/assessment/video/create",
            // },
          ],
        },
        {
          href: "/portal/question/coding",
          label: "Coding Questions",
          active: pathname.includes("/portal/question/coding"),
          icon: Code,
          submenus: [
            // {
            //   href: "/portal/assessment/coding",
            //   label: "Coding assessments",
            //   active: pathname === "/portal/assessment/coding",
            // },
            // {
            //   href: "/portal/assessment/coding/create",
            //   label: "Create",
            //   active: pathname === "/portal/assessment/coding/create",
            // },
          ],
        },
      ],
    },
  ]
}
