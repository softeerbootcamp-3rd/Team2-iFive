import { useState, useEffect } from "react";

export function useModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [animate, setAnimate] = useState(false);

    const open = () => {
        setIsOpen(true);
        setAnimate(true);
    };

    const close = () => {
        setAnimate(false);
    };

    useEffect(() => {
        if (!animate && !isOpen) {
            setIsOpen(false);
        }
    }, [animate]);

    return { isVisible: { isOpen, animate }, open, close };
}
