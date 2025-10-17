import { cn } from "@/lib/utils"

export const GreyContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("bg-primaryGrey rounded-large p-2", className)}>
            {children}
        </div>
    )
}