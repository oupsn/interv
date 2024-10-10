import * as React from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination"

import { cn } from "@/lib/utils"

interface PanigationProps {
  dataLength: number
  children: React.ReactNode
  size: number
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const Panigator: React.FC<PanigationProps> = ({
  dataLength,
  children,
  size,
  page,
  setPage,
}) => {
  const disable =
    "disabled:opacity-75 select-none text-iGrey hover:bg-white hover:text-iGrey"
  const non = "select-none hover:cursor-pointer"

  const selectPage = (id: number, type: string) => {
    if (type == "") setPage(id)
    else if (type == "next" && page < dataLength / size) setPage(id + 1)
    else if (type == "previous" && page - 1 > 0) setPage(id - 1)
  }
  return (
    <div className="flex flex-col h-full justify-between">
      {children}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={cn(page - 1 > 0 ? "hover:cursor-pointer" : disable)}
              onClick={() => selectPage(page, "previous")}
            />
          </PaginationItem>

          {page - 2 > 0 ? (
            <PaginationItem
              onClick={() => selectPage(page - 2, "")}
              className={non}
            >
              <PaginationLink>{page - 2}</PaginationLink>
            </PaginationItem>
          ) : (
            <></>
          )}

          {page - 1 > 0 ? (
            <PaginationItem
              onClick={() => selectPage(page - 1, "")}
              className={non}
            >
              <PaginationLink>{page - 1}</PaginationLink>
            </PaginationItem>
          ) : (
            <></>
          )}

          <PaginationItem>
            <PaginationLink isActive className={non}>
              {page}
            </PaginationLink>
          </PaginationItem>

          {page < dataLength / size ? (
            <PaginationItem
              onClick={() => selectPage(page + 1, "")}
              className={non}
            >
              <PaginationLink>{page + 1}</PaginationLink>
            </PaginationItem>
          ) : (
            <></>
          )}
          {page + 1 < dataLength / size ? (
            <PaginationItem
              onClick={() => selectPage(page + 2, "")}
              className={non}
            >
              <PaginationLink>{page + 2}</PaginationLink>
            </PaginationItem>
          ) : (
            <></>
          )}
          <PaginationItem>
            <PaginationNext
              className={cn(
                page < dataLength / size ? "hover:cursor-pointer" : disable,
              )}
              onClick={() => selectPage(page, "next")}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default Panigator
