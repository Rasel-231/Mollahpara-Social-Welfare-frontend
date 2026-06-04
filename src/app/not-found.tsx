import Link from 'next/link'
import Image from 'next/image'
import errorImg from "../../public/assets/error.png"


export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-background">
      <div className="max-w-md w-full flex flex-col items-center fade-in-up">
        
        <div className="w-full max-w-sm md:max-w-md drop-shadow-[0_0_15px_rgba(34,197,94,0.1)]">
          <Image 
            src={errorImg} 
            alt="404 Not Found" 
            className="w-full h-auto object-contain" 
            priority 
          />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mt-6 gradient-text">
          404 - Page Not Found
        </h1>
        
        <p className="mt-2 text-sm md:text-base text-muted-foreground px-4">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        
        <Link 
          href="/" 
          className="mt-6 inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 px-6 rounded-lg transition-all duration-200 shadow-md card-glow group"
        >
          <span>Return Home</span>
          <span className="flow-arrow transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  )
}