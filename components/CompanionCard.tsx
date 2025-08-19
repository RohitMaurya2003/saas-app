import Image from "next/image"
import Link from "next/link";

interface CompanionCardProps{
    id:string,
    name:string,
    topic:string,
    subject:string,
    duration:number,
    color:string,
}

const CompanionCard=({id: _id, name: _name, topic: _topic, subject, duration: _duration, color}:
CompanionCardProps)=>{
    return (

                <article className="companion-card" style={{backgroundColor:color}}>
                    <div className="flex justify-between items-center">
                        <div className="subject-badge">{subject}</div>
                        <button className="subject-badge">
                        <Image src="/icons/bookmark.svg" alt="bookmark"
                               width={12.5} height={15}
                        ></Image>
                        </button>

                    </div>
                    <h2 className="text-2xl font-bold">{_name}</h2>
                    <p className="text-sm">{_topic}</p>
                    <div className="flex items-center gap-2">
                        <Image src="/icons/clock.svg" alt="clock" width={15} height={15}></Image>
                        <p className="textsm">{_duration} minutes</p>
                    </div>
                    <Link href={`/companions/${_id}`} className="w-full">
                        <button className="btn-primary w-full justify-center">
                            Lunch Lesson
                        </button>
                    </Link>

                </article>

    )
}
export default CompanionCard