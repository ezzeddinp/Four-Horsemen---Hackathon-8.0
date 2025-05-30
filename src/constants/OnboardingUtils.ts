

export interface OnboardingUtils {
  id: number;
  title: string;
  description: string;
  icon: string;
  backgroundColor: string;
}

export const onboardingUtils: OnboardingUtils[] = [
  {
    id: 1,
    title: "Your Health, Our Priority",
    description: "Start Your Health Check Now – Snap, Chat, Diagnose",
    icon: require('assets/onboarding1.png'),
    backgroundColor: "bg-[#F2EDFE]"
  },
  {
    id: 2,
    title: "Healthcare Within Everyone’s Reach",
    description: "Discover Nearby Doctors & Hospital You Can Trust",

    icon: require('assets/onboarding2.png'),
    backgroundColor: "bg-[#F2EDFE]"
  },
  {
    id: 3,
    title: "No More Stress",
    description: "Healthcare That’s Easy, Fast, and Reliable.",
    
  icon: require('assets/onboarding3.png'),
    backgroundColor: "bg-[#F2EDFE]"
  }
];