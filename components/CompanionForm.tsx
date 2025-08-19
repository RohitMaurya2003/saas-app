"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectItem,
    SelectValue
} from "@/components/ui/select"
import { subjects } from "@/constants"
import { Textarea } from "@/components/ui/textarea"
import {createCompanion, addToSessionHistory} from "@/lib/actions/companion.actioins";
import {useRouter} from "next/navigation";

// ✅ Schema with required name & subject
const formSchema = z.object({
    companionName: z.string().min(2, {
        message: "Companion name must be at least 2 characters.",
    }),
    subject: z.string().min(1, {
        message: "Please select a subject.",
    }),
    topic: z.string().optional(),
    voice: z.string().optional(),
    style: z.string().optional(),
    duration: z.string().optional(),
})

export default function ProfileForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            companionName: "",
            subject: "",
            topic: "",
            voice: "",
            style: "",
            duration: "15",
        },
    })
    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try {
            const companion = await createCompanion(values);
            if(companion){
                // Add the companion to session history
                await addToSessionHistory(companion.id);
                router.push(`/companions/${companion.id}`);
            }
            else{
                console.log("error");
                router.push('/');
            }
        } catch (error) {
            console.error("Error creating companion:", error);
            router.push('/');
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(
                    onSubmit,
                    (errors) => {
                        console.log("❌ Validation Errors:", errors)
                    }
                )}
                className="space-y-8"
            >
                {/* Companion Name (required) */}
                <FormField
                    control={form.control}
                    name="companionName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Companion name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter the companion name" {...field} className="input" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Subject (required) */}
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="input capitalize">
                                        <SelectValue placeholder="select the subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subjects.map((subject) => (
                                            <SelectItem
                                                value={subject}
                                                key={subject}
                                                className="capitalize"
                                            >
                                                {subject}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Topic */}
                <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What should the companion help with?</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Ex. Derivatives & Integrals" {...field} className="input" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Voice (default = male) */}
                <FormField
                    control={form.control}
                    name="voice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Voice</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="input">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Style (default = formal) */}
                <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Style</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="input">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="formal">Formal</SelectItem>
                                        <SelectItem value="casual">Casual</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Duration */}
                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Estimated session duration (minutes)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="15"
                                    {...field}
                                    className="input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Build your own companion</Button>
            </form>
        </Form>
    )
}
