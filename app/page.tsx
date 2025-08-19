import React from 'react'
import {Button} from "@/components/ui/button";
import CompanionCard from "@/components/CompanionCard";
import Cta from "@/components/Cta";
import CompanionList from "@/components/CompanionList";
import {recentSessions} from "@/constants";

const Page = () => {
  return (
    <main>
      <h1 className="text-2xl underline">Popular Companioins</h1>

        <section className="home-section">
            <CompanionCard
                id="123"
                name="Neura the brainy explorer"
                topic="Neural Network of the brain"
                subject="scince"
                duration={45}
                color="#ffda6e"

            />
            <CompanionCard
                id="456"
                name="Countsy the Number Wizard"
                topic="Derivatives & Integrals"
                subject="math"
                duration={30}
                color="#e5d0ff"

            />
            <CompanionCard
                id="789"
                name="Verba the Vocabulary Builder"
                topic="Language"
                subject="English Literature"
                duration={30}
                color="#BDE7FF"

            />



        </section>

        <section className="home-section">
            <CompanionList
            title="Recently completed sessions"
            companions={recentSessions}
            className="w-2/3 max-lg:w-full"
            />
            <Cta/>
        </section>
    </main>
  )
}

export default Page