import React, { createContext, useContext, useRef } from 'react'

type Refs = {
    homeRef: React.RefObject<HTMLDivElement | null>
    goalsRef: React.RefObject<HTMLDivElement | null>
    visionRef: React.RefObject<HTMLDivElement | null>
    featuredRef: React.RefObject<HTMLDivElement | null>
    communityRef: React.RefObject<HTMLDivElement | null>
}
type ScrollContext = {
    refs: Refs
    scrollTo: (ref: React.RefObject<HTMLDivElement | null>) => void
}

const LandingScrollContext = createContext<ScrollContext | null>(null)

export const useLandingScroll = (): ScrollContext => {
    const ctx = useContext(LandingScrollContext)
    if (!ctx) {
        throw new Error(
            'useLandingScroll must be used within LandingScrollProvider',
        )
    }
    return ctx
}

export const LandingScrollProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const homeRef = useRef<HTMLDivElement | null>(null)
    const goalsRef = useRef<HTMLDivElement | null>(null)
    const visionRef = useRef<HTMLDivElement | null>(null)
    const featuredRef = useRef<HTMLDivElement | null>(null)
    const communityRef = useRef<HTMLDivElement | null>(null)

    const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const value = {
        refs: { homeRef, goalsRef, visionRef, featuredRef, communityRef },
        scrollTo,
    }
    return (
        <LandingScrollContext.Provider value={value}>
            {children}
        </LandingScrollContext.Provider>
    )
}
