"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Users, DollarSign, BarChart3, Building, ShoppingBag } from "lucide-react"

export function BusinessModelSection() {
  const businessModelItems = [
    {
      icon: <Target className="h-10 w-10 text-primary" />,
      title: "Value Proposition",
      description: "Low-cost, fast delivery, innovative solutions for businesses of all sizes.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Target Customers",
      description: "Startup Founders and SMEs looking for technology solutions.",
    },
    {
      icon: <Building className="h-10 w-10 text-primary" />,
      title: "Target Market",
      description: "US, Hong Kong, Taiwan; expandable to EU, Australia.",
    },
    {
      icon: <DollarSign className="h-10 w-10 text-primary" />,
      title: "Revenue Streams",
      description: "Compensation per project based on scope and requirements.",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: "Cost Structure",
      description: "Developer tools, cloud infrastructure, computer hardware.",
    },
    {
      icon: <ShoppingBag className="h-10 w-10 text-primary" />,
      title: "Sales Channels",
      description: "Clients' referral and business connections.",
    },
  ]

  return (
    <section className="bg-[#F6F3F1] py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Our Approach</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Business Model</h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
            How we create and deliver value to our clients
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {businessModelItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <div className="mb-2">{item.icon}</div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
