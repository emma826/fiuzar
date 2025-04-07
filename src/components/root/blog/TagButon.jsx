import Link from "next/link";

export default function TagButton({ href = "#0", text }) {
    return (
        <Link
            href={href}
            className="bg-gray-light mb-3 mr-3 inline-flex items-center justify-center rounded-sm px-4 py-2 text-sm text-black duration-300 hover:bg-primary hover:text-white dark:bg-[#2C303B] dark:text-white dark:hover:bg-primary"
        >
            {text}
        </Link>
    );
}