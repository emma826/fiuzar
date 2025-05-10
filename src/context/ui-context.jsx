'use client'

import { createContext, useContext, useEffect, useState } from "react";

const UIContext = createContext();

export function UIProvider({ children }) {
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        setIsMobile(windowWidth <= 750);
    }, [windowWidth]);

    return (
        <UIContext.Provider value={{ windowWidth, isMobile, isOpen, setIsOpen }}>
            {children}
        </UIContext.Provider>
    );
}

export function useUIContext() {
    return useContext(UIContext);
}
