import { Github, Globe, Heart, Rocket, Mail, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 sm:px-6">
      <div className="w-full max-w-5xl pt-8 pb-12 flex justify-between items-center">
        <Link href="/" className="text-3xl font-black tracking-tighter flex items-center gap-1 select-none hover:opacity-80 transition-opacity">
          <span className="text-accent">FAST</span>
          <span className="text-foreground">.COM</span>
        </Link>
        <Link href="/" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors">
          <ArrowLeft size={16} /> Back to test
        </Link>
      </div>

      <div className="flex-1 w-full max-w-3xl flex flex-col gap-12 py-12">
        <section className="space-y-6">
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight">Privacy & About</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            This project is a high-fidelity clone of FAST.com, built to demonstrate modern web performance and minimalist design principles.
            It is a tribute to the simplicity and efficiency of the original speed test experience.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-border pt-12">
          <div className="space-y-4">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <Rocket size={16} /> The Mission
            </h2>
            <p className="text-muted-foreground">
              Built with Next.js, Tailwind CSS, and passion. I believe the web should be fast, clean, and accessible to everyone.
              This clone serves as a playground for exploring high-performance animations and fluid typography.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <Heart size={16} /> Open Source
            </h2>
            <p className="text-muted-foreground">
              The code is completely open source. Feel free to explore the repository, suggest improvements, or contribute to the project.
              Let&apos;s build something great together.
            </p>
            <a
              href="https://github.com/MrMikeAde/Fast-clone"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-foreground font-black uppercase tracking-widest text-xs hover:bg-foreground hover:text-background transition-colors"
            >
              <Github size={16} /> Contribute on GitHub
            </a>
          </div>
        </section>

        <section className="bg-secondary p-8 sm:p-12 space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-tight">Need a professional developer?</h2>
            <p className="text-muted-foreground">
              I specialize in building high-performance, minimalist, and scalable web applications.
              Whether you have a startup idea or need to modernize an existing platform, I&apos;m here to help.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://meetmike.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background font-black uppercase tracking-widest text-xs hover:opacity-90 transition-opacity"
            >
              <Globe size={16} /> Visit Portfolio
            </a>
            <a
              href="mailto:michaeladedapo01@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-foreground font-black uppercase tracking-widest text-xs hover:bg-foreground hover:text-background transition-colors"
            >
              <Mail size={16} /> Get in touch
            </a>
          </div>
        </section>
      </div>

      <footer className="w-full max-w-5xl py-8 border-t border-border flex justify-end items-center text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] mt-auto">
        <div className="flex items-center gap-2 select-none">
          Powered by <Github size={12} className="inline-block" /> /Mrmikeade
        </div>
      </footer>
    </main>
  )
}
