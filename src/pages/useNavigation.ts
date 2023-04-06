import { ReactElement, useState } from "react";

type StepT = {
    title: React.ReactNode
    content: ReactElement
}


export function useNavigation(steps: StepT[]) {
    const [current, setCurrent] = useState(0);

    const isFirstStep:boolean = current === 0;
    const isLastStep:boolean = current === steps.length - 1;

    function next() {
        setCurrent(i => {
            if (i >= steps.length - 1) return i;
            return i + 1;
        })
    }

    function prev() {
        setCurrent(i => {
            if (i === 0) return i;
            return i - 1;
        })
    }

    function goTo(index: number) {
        setCurrent(index)
    }

    return {
        current,
        step: steps[current],
        steps,
        next,
        prev,
        goTo,
        isFirstStep,
        isLastStep
    }
}