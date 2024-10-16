"use client"

import { z } from "zod";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { LoaderCircle } from "lucide-react";
import { FileUploader } from "../functions/FileUploader";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "../ui/form";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useFetch } from "../hooks/useFetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "@/types/appwrite.types";
import { updateProject } from "@/app/admin/api/projects/[id]/route";

export const EditProject = ({ id }: { id: string }) => {
    const schema = projectSchema();
    const t = useTranslations("Admin.Create");
    const [isLoading, setIsLoading] = useState(false);
    
    const { project, isFetchLoading, fetchError } = useFetch(id);

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: project?.title ?? "",
            subtitle: project?.subtitle ?? "",
            description: project?.description ?? "",
            image: [],
            githubURL: project?.githubURL ?? "",
            liveURL: project?.liveURL ?? "",
            date: project?.date ?? "",
        },
    });

    if (isFetchLoading) {
        return (
            <div className="flex flex-row items-center gap-2 mt-4">
                <LoaderCircle className="animate-spin size-4" />
                <p>{t("Status.Loading")}</p>
            </div>
        );
    }

    if (fetchError) {
        return (
            <div className="mt-4 flex items-center justify-center md:justify-start shadow-xl shadow-[bg-red-500]">
                <p className="flex flex-row items-center justify-center gap-2 bg-red-400 rounded-lg shadow-xl text-white h-12 p-4 text-center text-sm">
                    <ExclamationTriangleIcon />
                    {t("Status.ErrorEdit")}
                </p>
            </div>
        );
    }

    if (!project) {
        return <div className="mt-4">{t("Status.NotFound")}</div>;
    }

    const onSubmit = async (values: z.infer<typeof schema>) => {
        setIsLoading(true);

        let formData;
        if (values.image && values.image?.length > 0) {
            const blobFile = new Blob([values.image[0]], {
                type: values.image[0].type,
            });

            formData = new FormData();
            formData.append("blobFile", blobFile);
            formData.append("fileName", values.image[0].name);
        }

        try {
            const data = {
                title: values.title,
                subtitle: values.subtitle,
                description: values.description,
                image: values.image ? formData : undefined,
                githubURL: values.githubURL,
                liveURL: values.liveURL,
                date: values.date,
            };

            const response = await updateProject(id, data);

            if (response) {
                toast.success(t("Status.Success"));
                form.reset();
            };
        } catch (error: any) {
            toast.error(t("Status.ErrorEdit"), error.message);
        };

        setIsLoading(false);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4 overflow-hidden mt-8 px-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-2">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder={t("Title")} {...field} className="glassmorphism bg-zinc-200 backdrop-blur-[33px] bg-opacity-50 bg-clip-padding shadow-lg p-2 w-full rounded-lg" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="subtitle"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder={t("Subtitle")} {...field} className="glassmorphism bg-zinc-200 backdrop-blur-[33px] bg-opacity-50 bg-clip-padding shadow-lg p-2 w-full rounded-lg" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-2">
                    <div className="flex flex-col gap-4 w-full">
                        <FormField
                            control={form.control}
                            name="githubURL"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input placeholder={t("Github")} {...field} className="glassmorphism bg-zinc-200 backdrop-blur-[33px] bg-opacity-50 bg-clip-padding shadow-lg p-2 w-full rounded-lg" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="liveURL"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input placeholder={t("Live")} {...field} className="glassmorphism bg-zinc-200 backdrop-blur-[33px] bg-opacity-50 bg-clip-padding shadow-lg p-2 w-full rounded-lg" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Textarea placeholder={t("Description")} {...field} className="h-full glassmorphism bg-zinc-200 backdrop-blur-[33px] bg-opacity-50 bg-clip-padding shadow-lg p-2 w-full rounded-lg" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <FileUploader files={field.value} onChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex items-center justify-center w-full pb-6">
                    <button type="submit" className="button">
                        {isLoading ? (
                            <div className="flex flex-row items-center justify-center gap-2">
                                <LoaderCircle className="animate-spin" />
                                <p>{t("Submit")}</p>
                            </div>
                        ) : (
                            <p>{t("Submit")}</p>
                        )}
                    </button>
                </div>
            </form>
        </Form>
    );
};