import CompanionForm from "@/components/CompanionForm";
import { redirect } from "next/navigation";

// Server action to check authentication
import { checkAuth } from "./actions";

const NewCompanion = () => {
    return (
        <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
            <article className="w-full gap-4 flex flex-col">
                <h1>Companion Builder</h1>

                <CompanionForm />
            </article>
        </main>
    );
};

// This ensures authentication check happens before rendering the page
export default async function NewCompanionPage() {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
        redirect('/sign-in');
    }
    
    return <NewCompanion />;
}
