import Link from "next/link";
import { CaretRight } from "phosphor-react";

export const NavButtons = ({ path, icon, text }) => {
    return (
        <Link href={path} className="flex justify-between px-3 rounded-md hover:bg-gray-300 py-2 lg:py-2.5">
            {icon}
            <span>{text}</span>
            <CaretRight size={20} />
        </Link>
    );
};
