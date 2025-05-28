export interface OnboardingUtils {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  backgroundColor: string;
}

export const onboardingUtils: OnboardingUtils[] = [
  {
    id: 1,
    title: "Welcome",
    subtitle: "Get Started",
    description: "Discover amazing features and get the most out of our app with this quick tour.",
    icon: "🚀",
    backgroundColor: "bg-blue-500"
  },
  {
    id: 2,
    title: "Easy to Use",
    subtitle: "Simple Interface",
    description: "Our intuitive design makes it easy for anyone to navigate and use all features effortlessly.",
    icon: "⚡",
    backgroundColor: "bg-purple-500"
  },
  {
    id: 3,
    title: "Secure & Safe",
    subtitle: "Your Privacy Matters",
    description: "We prioritize your data security with end-to-end encryption and privacy protection.",
    icon: "🔒",
    backgroundColor: "bg-green-500"
  },
  {
    id: 4,
    title: "Ready to Go",
    subtitle: "Let's Begin",
    description: "You're all set! Create your account or sign in to start your amazing journey with us.",
    icon: "🎉",
    backgroundColor: "bg-orange-500"
  }
];