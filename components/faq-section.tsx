"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Script from "next/script"

export function FaqSection() {
  const faqs = [
    {
      question: "What services does tecxmate offer?",
      answer:
        "tecxmate specializes in AI application development and business automation. We build intelligent applications powered by machine learning, automate business workflows, provide AI integration consulting, and create custom automation solutions tailored for SMEs and Founders.",
    },
    {
      question: "How long does it take to complete a project?",
      answer:
        "Project timelines vary depending on complexity and scope. Our process includes Discovery, Requirements Specification, Partnership Agreement, Demo Stage, Delivery Stage, and Warranty Stage. During our initial consultation, we'll provide a detailed timeline based on your specific requirements.",
    },
    {
      question: "What industries do you serve?",
      answer:
        "We serve various sectors including Education Technology, Business Productivity and Workflow Automation, Blockchain and Digital Assets, Wholesales, Retails, and E-commerce, as well as Influencers and Attention Economy.",
    },
    {
      question: "How much does a project cost?",
      answer:
        "Project costs vary based on your specific requirements, complexity, and features needed. We offer solutions for various budgets with a focus on low-cost, fast delivery, and innovative solutions. Contact us for a personalized quote based on your project specifications.",
    },
    {
      question: "Do you work with clients internationally?",
      answer:
        "Yes, we have a global presence with a focus on US, Hong Kong, and Taiwan markets, and are expanding to EU and Australia. We work with clients from across the globe and have experience managing projects remotely with effective communication and collaboration tools.",
    },
    {
      question: "How can I get started with tecxmate?",
      answer:
        "You can get started by contacting us through email at niko.tecx@gmail.com, messaging us on WhatsApp, Line, or WeChat at nikolasdoan, or booking a discovery call through our website. We'll discuss your project needs and guide you through our process.",
    },
  ]

  // FAQ Schema for SEO
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
    <section id="faq" className="bg-alt-gray-100 py-20 md:py-24 lg:py-28">
      <div className="container px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="mb-6">Frequently Asked Questions</h2>
          <p className="text-alt-gray-500 max-w-2xl mx-auto">
            Find answers to common questions about our services and process
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index}
              value={`item-${index}`} 
              className="border-b border-alt-gray-200 py-4"
            >
              <AccordionTrigger className="text-left font-semibold text-alt-black hover:text-primary transition-colors duration-200">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-alt-gray-500 leading-relaxed pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
    </>
  )
}
