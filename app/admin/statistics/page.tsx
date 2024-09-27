import { useTranslations } from "next-intl";

const Page = () => {
    const t = useTranslations("Admin.Statistics")

    return (
        <section>
            <h1 className="heading_admin">{t("Heading")}</h1>
        </section>
    );
};

export default Page;