import TopBar from "@/components/layout/TopBar"
import TopBarItem from "@/components/layout/TopBarItem"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate, useLocation } from "react-router-dom"
import {
  Code,
  Video,
  Check,
  Timer,
  AlertTriangle,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"

const ImageCarousel = ({
  images,
  title,
}: {
  images: string[]
  title: string
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    )
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-6">
      <h4 className="text-lg font-semibold mb-3">{title}</h4>
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={`Interface example ${currentIndex + 1}`}
          className="w-full h-full object-contain"
        />

        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  )
}

function QuestionGuideline() {
  const navigate = useNavigate()
  const location = useLocation()

  const codingImages = [
    "https://via.assets.so/img.jpg?w=800&h=450",
    "https://via.assets.so/img.jpg?w=800&h=450",
    "https://via.assets.so/img.jpg?w=800&h=450",
    "https://via.assets.so/img.jpg?w=800&h=450",
  ]

  const videoImages = [
    "https://via.assets.so/img.jpg?w=800&h=450",
    "https://via.assets.so/img.jpg?w=800&h=450",
    "https://via.assets.so/img.jpg?w=800&h=450",
  ]

  return (
    <div className="flex flex-col w-dvw h-dvh">
      <TopBar>
        <TopBarItem
          title="Home"
          onClick={() => navigate(location.pathname.split("/guideline")[0])}
        />
        <TopBarItem title="Guideline" />
      </TopBar>

      <div className="flex flex-col items-start justify-start h-dvh px-16 py-8 max-w-5xl mx-auto overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Interview Guideline</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Welcome to your interview preparation guide. This tutorial will walk
            you through both the coding and video sections, providing essential
            tips and guidelines to help you perform at your best.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="border rounded-lg p-2">
            <AccordionTrigger className="text-xl font-semibold px-4 hover:no-underline">
              <div className="flex items-center gap-3">
                <Code className="w-6 h-6 text-primary" />
                Coding Challenge Guide
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-4">
              <div className="space-y-6">
                <ImageCarousel
                  images={codingImages}
                  title="Coding Challenge Interface Guide"
                />

                <section className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Timer className="w-5 h-5" />
                    Time Management
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Read the problem statement carefully before starting
                    </li>
                    <li>Take 5-10 minutes to plan your approach</li>
                    <li>
                      Start with a basic solution, then optimize if time permits
                    </li>
                    <li>Save time for testing your code</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    Best Practices
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Write clean, well-commented code</li>
                    <li>Use meaningful variable and function names</li>
                    <li>Consider edge cases in your solution</li>
                    <li>Test your code with different inputs</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Interface Elements
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Code Editor: Write and edit your solution</li>
                    <li>Test Cases: Run and verify your code</li>
                    <li>Problem Description: Details and requirements</li>
                    <li>Submit Button: Submit your final solution</li>
                  </ul>
                </section>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border rounded-lg p-2">
            <AccordionTrigger className="text-xl font-semibold px-4 hover:no-underline">
              <div className="flex items-center gap-3">
                <Video className="w-6 h-6 text-primary" />
                Video Interview Guide
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-4">
              <div className="space-y-6">
                <ImageCarousel
                  images={videoImages}
                  title="Video Interview Interface Guide"
                />

                <section className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Timer className="w-5 h-5" />
                    Time Management
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>You'll have time to prepare before recording</li>
                    <li>Each answer should be concise and focused</li>
                    <li>Practice managing your response time</li>
                    <li>You can't pause once recording starts</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    Interface Elements
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Camera Preview: Check your video appearance</li>
                    <li>Question Display: Current question text</li>
                    <li>Timer: Countdown for preparation and recording</li>
                    <li>Recording Controls: Start/stop recording</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Technical Setup
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Test your camera and microphone beforehand</li>
                    <li>Ensure stable internet connection</li>
                    <li>Choose a quiet environment</li>
                    <li>Have good lighting, preferably facing you</li>
                  </ul>
                </section>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Card className="mt-8 p-6 bg-gray-50 w-full">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Important Note</h3>
              <p className="text-gray-600">
                The images above are examples of what you'll see during the
                interview. Take time to familiarize yourself with the interface
                before starting. If you encounter any technical issues during
                the interview, don't hesitate to contact support at
                help@interv.cc
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default QuestionGuideline
