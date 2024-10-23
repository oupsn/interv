import TopBar from "@/components/layout/TopBar"
import TopBarItem from "@/components/layout/TopBarItem"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { useNavigate, useLocation } from "react-router-dom"

function QuestionTutorial() {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <>
      <TopBar>
        <TopBarItem
          title={`Home`}
          onClick={() => navigate(location.pathname.split("/tutorial")[0])}
        />
        <TopBarItem title={`Tutorial`} />
      </TopBar>
      <div className="flex flex-col items-start justify-start h-dvh px-16 py-8">
        <h1 className="text-2xl font-semibold">Tutorial</h1>
        <h3 className="text-lg">
          This tutorial is designed to guide you through the question you are
          about to answer. It will provide you with essential information, tips,
          and examples to help you understand the concepts involved. By
          following this tutorial, you will enhance your knowledge and improve
          your ability to tackle similar questions in the future.
        </h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-semibold">
              Coding Question
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-semibold">
              Video Question
            </AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  )
}

export default QuestionTutorial
