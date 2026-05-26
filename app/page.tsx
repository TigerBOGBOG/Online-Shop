import Link from "next/link"
import Image from "next/image"
export default function Home(){
    return<>
        <section className="pt-16 relative h-screen">
            <Image
                src="/Hero.jpg"
                alt="picture"
                fill
                priority
                className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/20 to-transparent" />
        <div className="relative z-10 flex h-full items-center justify-center">
            <Link href="/product">
                <button
                    className="
                        bg-white 
                        px-6 
                        py-3 
                        text-black 
                        rounded-md
                        transition-all
                        duration-300
                        hover:scale-110
                        hover:bg-black
                        hover:text-white
                    "
                    >
                SHOP NOW
                </button>
        </Link>
        </div>
        </section>
        

    
    </>
}