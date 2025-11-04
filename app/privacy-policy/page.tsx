import { readFile } from 'fs/promises'
import { join } from 'path'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import ReactMarkdown from 'react-markdown'

async function getPrivacyPolicy() {
  try {
    const filePath = join(process.cwd(), 'public', 'privacy-policy.md')
    const content = await readFile(filePath, 'utf8')
    return content
  } catch (error) {
    return '# Privacy Policy\n\nContent not available.'
  }
}

export default async function PrivacyPolicyPage() {
  const content = await getPrivacyPolicy()

  return (
    <div className="min-h-screen bg-[#F6F3F1]">
      <Navbar />
      <div className="container px-4 md:px-6 max-w-4xl py-20 md:py-24">
        <article className="prose prose-lg max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 className="text-4xl font-bold mb-6 text-alt-black">{children}</h1>,
              h2: ({ children }) => <h2 className="text-2xl font-semibold mt-8 mb-4 text-alt-black">{children}</h2>,
              h3: ({ children }) => <h3 className="text-xl font-semibold mt-6 mb-3 text-alt-black">{children}</h3>,
              p: ({ children }) => <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>,
              ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">{children}</ul>,
              li: ({ children }) => <li className="leading-relaxed">{children}</li>,
              strong: ({ children }) => <strong className="font-semibold text-alt-black">{children}</strong>,
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>
      <Footer />
    </div>
  )
}

