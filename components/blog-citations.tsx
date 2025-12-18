"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FileText } from "lucide-react"

interface BlogCitationsProps {
  citations?: string
}

export function BlogCitations({ citations }: BlogCitationsProps) {
  // Don't render if no citations
  if (!citations || citations.trim().length === 0) {
    return null
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="citations" className="border border-gray-200 rounded-lg px-4">
          <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-primary transition-colors duration-200 py-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Citations & References</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 leading-relaxed pt-2 pb-4">
            <div 
              className="prose prose-sm max-w-none prose-p:text-gray-700 prose-ul:text-gray-700 prose-li:text-gray-700 prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: citations }} 
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}


