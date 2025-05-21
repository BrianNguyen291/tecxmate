"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FaqSection() {
  const faqs = [
    {
      question: "What services does Tecxmate offer?",
      answer:
        "Tecxmate offers a comprehensive range of technology services including MVP development, software development for websites and mobile apps, market research and consultancy, UI/UX design, and graphics design services tailored for SMEs and Founders.",
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
      question: "How can I get started with Tecxmate?",
      answer:
        "You can get started by contacting us through email at tecxmate@gmail.com, messaging us on WhatsApp, Line, or WeChat at nikolasdoan, or booking a discovery call through our website. We'll discuss your project needs and guide you through our process.",
    },
  ]

  return (
    <section id="faq" className="bg-[#F6F3F1] py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
            Find answers to common questions about our services and process
          </p>
        </motion.div>

        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem value={`item-${index}`} className="border-b border-gray-200">
                  <AccordionTrigger className="text-left font-medium hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-500">{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
