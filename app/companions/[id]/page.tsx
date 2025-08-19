import { getCompanion } from "@/lib/actions/companion.actioins";

interface CompanionSessionProps {
    params: {
        id: string;
    };
}

const CompanionSession = async ({ params }: CompanionSessionProps) => {
    const companion = await getCompanion(params.id);

    if (!companion) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold">Companion not found</h1>
                <p>The companion you're looking for doesn't exist or has been removed.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">{companion.name}</h1>
            <p>Subject: {companion.subject}</p>
            {companion.topic && <p>Topic: {companion.topic}</p>}
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Companion Session</h2>
                <p>Your companion session is ready. Start chatting with your companion!</p>
            </div>
        </div>
    );
};

export default CompanionSession;