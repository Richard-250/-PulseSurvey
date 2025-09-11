import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useWallet } from "@/hooks/useWallet";
import { toast } from "sonner";

type Question = {
  id: string;
  text: string;
  choices: string[];
  explanation: string[];
};

type QuestionSet = {
  id: string;
  questions: Question[];
  createdAt: number;
};

type QuestionTiming = {
  questionId: string;
  startTime: number;
  endTime?: number;
  duration?: number;
};

type AnswerSubmission = {
  questionId: string;
  choice: string;
  answeredAt: number;
};

// Demo questions for localStorage (will be replaced with API calls later)
const DEMO_QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "How many minutes do you typically spend commuting each weekday?",
    choices: ["Less than 15", "15–30", "30–60", "More than 60"],
    explanation: [
      "We ask this because commute time affects quality of life and informs infrastructure planning.",
      "Aggregated commute data helps public transport authorities schedule routes and allocate resources.",
      "Short commute patterns can indicate where micro-mobility solutions are most effective.",
      "Your anonymized response is combined with others to produce actionable insights for planners.",
    ],
  },
  {
    id: "q2",
    text: "Which grocery item have you noticed has increased most in price recently?",
    choices: ["Bread & staples", "Vegetables & fruits", "Cooking oil", "Dairy & eggs"],
    explanation: [
      "Price changes indicate inflation pressure in specific categories.",
      "Retailers and regulators use category-level trends to target interventions.",
      "Your response helps brands decide which products need discounts or supply adjustments.",
      "Only aggregated patterns are shared; personal data is never revealed.",
    ],
  },
  {
    id: "q3",
    text: "How reliable is your mobile network during peak evening hours?",
    choices: ["Very reliable", "Mostly reliable", "Occasionally drops", "Often unavailable"],
    explanation: [
      "Network reliability is critical for emergency services and businesses.",
      "Telecom operators rely on coverage feedback to plan capacity upgrades.",
      "This data helps prioritize neighborhoods that need infrastructure investment.",
      "Responses are used in aggregate to improve service levels across regions.",
    ],
  },
  {
    id: "q4",
    text: "Do you prefer mobile money or cash for small purchases under 5,000 RWF?",
    choices: ["Mobile money", "Cash", "Depends on merchant", "No preference"],
    explanation: [
      "Understanding payment preferences helps merchants choose payment terminals.",
      "Fintech companies use this to improve checkout flows and adoption incentives.",
      "Insights guide where to promote mobile money education and merchant onboarding.",
      "Your aggregated answer supports better payment experiences for everyone.",
    ],
  },
  {
    id: "q5",
    text: "How many hours of uninterrupted electricity did you have yesterday?",
    choices: ["0–4", "5–8", "9–16", "More than 16"],
    explanation: [
      "Electricity reliability impacts productivity and household wellbeing.",
      "Utilities use outage duration data to schedule maintenance and invest in resilience.",
      "This helps prioritize regions for backup power and capacity expansion.",
      "Your responses are aggregated and never tied to your identity.",
    ],
  },
  {
    id: "q6",
    text: "How often do you shop using online delivery services in a month?",
    choices: ["Never", "1–3 times", "4–8 times", "More than 8"],
    explanation: [
      "E-commerce demand signals help improve delivery logistics.",
      "Frequency data assists companies in optimizing coverage and pricing.",
      "Understanding usage patterns helps tailor promotions and services.",
      "Responses are used only in aggregate to inform business decisions.",
    ],
  },
  {
    id: "q7",
    text: "Which social media platform do you use most for news?",
    choices: ["Facebook", "Twitter/X", "WhatsApp/Telegram", "Other"],
    explanation: [
      "News consumption patterns help design information campaigns and public messaging.",
      "Aggregated data supports efforts to combat misinformation.",
      "Researchers use platform preference to understand reach and audience demographics.",
      "We keep individual responses private while summarizing trends.",
    ],
  },
  {
    id: "q8",
    text: "How comfortable are you using contactless payments in small shops?",
    choices: ["Very comfortable", "Somewhat comfortable", "Not comfortable", "I avoid them"],
    explanation: [
      "Merchant adoption of contactless payments depends on consumer comfort.",
      "This helps payment providers know where to focus user education.",
      "Understanding barriers guides investments in merchant support.",
      "We aggregate responses to help improve payment acceptance.",
    ],
  },
  {
    id: "q9",
    text: "Do you use any fitness or health apps daily?",
    choices: ["Yes", "No", "Occasionally", "I used to"],
    explanation: [
      "App usage insights guide health product teams to build better features.",
      "Daily habit data is useful for wellness program design.",
      "Aggregates help researchers study health behaviors at scale.",
      "We protect privacy by never sharing personally identifiable information.",
    ],
  },
  {
    id: "q10",
    text: "How often do power outages affect your work or study?",
    choices: ["Never", "Rarely", "Sometimes", "Often"],
    explanation: [
      "This helps utilities prioritize investments where outages cause biggest disruption.",
      "Understanding outage frequency supports resilience planning.",
      "Aggregated patterns inform policy decisions and emergency response.",
      "Your responses are anonymized and used only to improve services.",
    ],
  },
];

// Survey Service - Ready for backend integration
class SurveyService {
  private static readonly STORAGE_KEYS = {
    QUESTIONS: "ps_questions_pool",
    USERS: "ps_users",
    CURRENT_SET: "ps_current_set",
  };

  // TODO: Replace with actual API endpoint
  static async fetchQuestionSet(): Promise<QuestionSet> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // For now, use localStorage. Later replace with: 
      // const response = await fetch('/api/surveys/questions', { method: 'GET' });
      // return response.json();
      
      const pool = this.getQuestionsPool();
      const questions = this.selectRandomQuestions(pool, 5);
      
      return {
        id: this.generateSetId(),
        questions,
        createdAt: Date.now(),
      };
    } catch (error) {
      throw new Error('Failed to fetch question set');
    }
  }

  // TODO: Replace with actual API endpoint
  static async submitAnswer(questionId: string, choice: string, setId: string): Promise<{ success: boolean; coinsEarned: number }> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // For now, use localStorage. Later replace with:
      // const response = await fetch('/api/surveys/answers', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ questionId, choice, setId })
      // });
      // return response.json();
      
      const coinsEarned = 5;
      this.recordAnswerLocally(questionId, choice);
      return { success: true, coinsEarned };
    } catch (error) {
      throw new Error('Failed to submit answer');
    }
  }

  private static getQuestionsPool(): Question[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.QUESTIONS);
      if (stored) {
        return JSON.parse(stored);
      }
      // Initialize with demo questions
      localStorage.setItem(this.STORAGE_KEYS.QUESTIONS, JSON.stringify(DEMO_QUESTIONS));
      return DEMO_QUESTIONS;
    } catch {
      return DEMO_QUESTIONS;
    }
  }

  private static selectRandomQuestions(pool: Question[], count: number): Question[] {
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, pool.length));
  }

  private static generateSetId(): string {
    return `set_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private static recordAnswerLocally(questionId: string, choice: string): void {
    // This will be removed when backend is implemented
    const answer: AnswerSubmission = {
      questionId,
      choice,
      answeredAt: Date.now(),
    };
    
    const stored = localStorage.getItem('user_answers') || '[]';
    const answers = JSON.parse(stored);
    answers.push(answer);
    localStorage.setItem('user_answers', JSON.stringify(answers));
  }
}

export default function SurveyFlow() {
  const { user, refetch: refetchAuth } = useAuth();
  const { refetch: refetchWallet } = useWallet(Boolean(user));

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [questionSet, setQuestionSet] = useState<QuestionSet | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  
  // Time tracking states
  const [questionTimings, setQuestionTimings] = useState<QuestionTiming[]>([]);
  const [currentQuestionStartTime, setCurrentQuestionStartTime] = useState<number | null>(null);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const [timeWarningCountdown, setTimeWarningCountdown] = useState(0);
  
  const explanationRef = useRef<HTMLDivElement | null>(null);
  const bottomMarkerRef = useRef<HTMLDivElement | null>(null);
  const actionButtonsRef = useRef<HTMLDivElement | null>(null);

  // Initialize survey on component mount
  useEffect(() => {
    initializeSurvey();
  }, []);

  // Setup scroll observer for current question
  useEffect(() => {
    const cleanup = setupScrollObserver();
    return cleanup;
  }, [currentQuestionIndex, questionSet]);

  // Reset selection and scroll state when question changes
  useEffect(() => {
    setSelectedChoice(null);
    setHasScrolledToBottom(false);
    
    // Start timing for the new question
    const startTime = Date.now();
    setCurrentQuestionStartTime(startTime);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentQuestionIndex]);

  const initializeSurvey = async () => {
    try {
      setLoading(true);
      const newQuestionSet = await SurveyService.fetchQuestionSet();
      setQuestionSet(newQuestionSet);
      setCurrentQuestionIndex(0);
      setAnsweredQuestions(new Set());
      setQuestionTimings([]);
      setCurrentQuestionStartTime(Date.now());
      setShowTimeWarning(false);
      setTimeWarningCountdown(0);
    } catch (error) {
      toast.error('Failed to load survey questions');
      console.error('Survey initialization error:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupScrollObserver = () => {
    if (!bottomMarkerRef.current || !explanationRef.current) {
      return () => {};
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setHasScrolledToBottom(true);
        }
      },
      {
        root: explanationRef.current,
        threshold: 1.0,
        rootMargin: '0px 0px -10px 0px'
      }
    );

    observer.observe(bottomMarkerRef.current);
    return () => observer.disconnect();
  };

  const handleAnswerSubmission = async () => {
    if (!questionSet || !user || selectedChoice === null || !currentQuestionStartTime) {
      if (!user) {
        window.location.href = "/signup";
        return;
      }
      if (selectedChoice === null) {
        toast.error("Please select an answer before confirming");
        return;
      }
      return;
    }

    if (!hasScrolledToBottom) {
      toast.error("Please scroll through the explanation to continue");
      actionButtonsRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const currentQuestion = questionSet.questions[currentQuestionIndex];
    const selectedAnswer = currentQuestion.choices[selectedChoice];
    const endTime = Date.now();
    const duration = endTime - currentQuestionStartTime;

    // Record timing for this question
    const newTiming: QuestionTiming = {
      questionId: currentQuestion.id,
      startTime: currentQuestionStartTime,
      endTime,
      duration
    };

    try {
      setSubmitting(true);
      const result = await SurveyService.submitAnswer(
        currentQuestion.id,
        selectedAnswer,
        questionSet.id
      );

      if (result.success) {
        // Update local state
        setAnsweredQuestions(prev => new Set([...prev, currentQuestion.id]));
        setQuestionTimings(prev => [...prev, newTiming]);
        
        // Update user balance locally (this will be handled by backend later)
        await updateUserBalance(result.coinsEarned);
        
        toast.success(`+${result.coinsEarned} coins earned!`, {
          description: "Thank you for your valuable response"
        });

        // Refresh auth and wallet data
        try {
          await refetchAuth();
          await refetchWallet();
        } catch (error) {
          console.warn('Failed to refresh user data:', error);
        }
      }
    } catch (error) {
      toast.error("Failed to submit answer. Please try again.");
      console.error('Answer submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const updateUserBalance = async (coinsEarned: number) => {
    // TODO: Remove this when backend handles balance updates
    try {
      const usersData = JSON.parse(localStorage.getItem("ps_users") || "{}");
      const userEmail = user?.email?.toLowerCase();
      
      if (userEmail && usersData[userEmail]) {
        usersData[userEmail].balance = (usersData[userEmail].balance || 0) + coinsEarned;
        usersData[userEmail].transactions = usersData[userEmail].transactions || [];
        usersData[userEmail].transactions.push({
          id: Math.random().toString(36).substr(2, 9),
          type: "credit",
          amount_coins: coinsEarned,
          status: "completed",
          created_at: Date.now(),
        });
        
        localStorage.setItem("ps_users", JSON.stringify(usersData));
      }
    } catch (error) {
      console.error('Failed to update local balance:', error);
    }
  };

  const calculateTotalTimeSpent = (timings: QuestionTiming[]): number => {
    return timings.reduce((total, timing) => total + (timing.duration || 0), 0);
  };

  const showTimeWarningModal = (additionalTimeNeeded: number) => {
    setTimeWarningCountdown(additionalTimeNeeded);
    setShowTimeWarning(true);
    
    // Start countdown
    const interval = setInterval(() => {
      setTimeWarningCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setShowTimeWarning(false);
          // Auto-load new questions after countdown
          toast.success("Thank you for your patience! Loading new questions...");
          setTimeout(initializeSurvey, 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (!questionSet) return;

    if (currentQuestionIndex < questionSet.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Survey completed - check if user spent enough time
      const totalTimeSpent = calculateTotalTimeSpent(questionTimings);
      const minRequiredTime = 40 * 1000; // 40 seconds in milliseconds
      
      if (totalTimeSpent < minRequiredTime) {
        const remainingTime = Math.ceil((minRequiredTime - totalTimeSpent) / 1000);
        showTimeWarningModal(remainingTime);
        return;
      }
      
      // User spent enough time - load new question set
      toast.success("Survey set completed! Loading new questions...");
      setTimeout(initializeSurvey, 1000);
    }
  };

  const handleSkipQuestion = () => {
    if (!questionSet || !currentQuestionStartTime) return;

    // Record timing for skipped question (partial time)
    const endTime = Date.now();
    const duration = endTime - currentQuestionStartTime;
    const currentQuestion = questionSet.questions[currentQuestionIndex];
    
    const skippedTiming: QuestionTiming = {
      questionId: currentQuestion.id,
      startTime: currentQuestionStartTime,
      endTime,
      duration
    };
    
    setQuestionTimings(prev => [...prev, skippedTiming]);

    if (currentQuestionIndex < questionSet.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Check time requirement for skipped last question
      const totalTimeSpent = calculateTotalTimeSpent([...questionTimings, skippedTiming]);
      const minRequiredTime = 40 * 1000;
      
      if (totalTimeSpent < minRequiredTime) {
        const remainingTime = Math.ceil((minRequiredTime - totalTimeSpent) / 1000);
        showTimeWarningModal(remainingTime);
        return;
      }
      
      initializeSurvey();
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl border p-8 bg-card shadow-sm">
        <div className="flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading survey questions...</div>
        </div>
      </div>
    );
  }

  if (!questionSet || questionSet.questions.length === 0) {
    return (
      <div className="rounded-xl border p-8 bg-card shadow-sm">
        <div className="text-center">
          <p className="text-muted-foreground">No questions available at the moment.</p>
          <Button onClick={initializeSurvey} className="mt-4">
            Retry Loading
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = questionSet.questions[currentQuestionIndex];
  const isQuestionAnswered = answeredQuestions.has(currentQuestion.id);
  const canSubmitAnswer = hasScrolledToBottom && selectedChoice !== null && !isQuestionAnswered;
  const isLastQuestion = currentQuestionIndex === questionSet.questions.length - 1;

  return (
    <div className="space-y-6">
      {/* Time Warning Modal */}
      {showTimeWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in fade-in duration-200">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 mb-4">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Please Take Your Time
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                To ensure quality responses and prevent rushing, we require at least 40 seconds total time for each question set. 
                This helps us maintain the integrity of our survey data.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                <p className="text-amber-800 text-sm font-medium">
                  Please wait {timeWarningCountdown} more seconds before continuing
                </p>
                <div className="mt-2 w-full bg-amber-200 rounded-full h-2">
                  <div 
                    className="bg-amber-600 h-2 rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${Math.max(0, Math.min(100, 100 - (timeWarningCountdown / 40) * 100))}%` }}
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Thank you for your patience. This ensures better survey quality for everyone.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Survey Introduction */}
      <div className="rounded-xl border bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-sm">
        <div className="max-w-3xl">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Your Voice Matters - Earn While You Share
          </h1>
          <p className="text-gray-700 mb-4">
            Welcome to our innovative survey platform where your opinions drive positive change in Rwanda and beyond. 
            We partner with leading organizations, government agencies, and research institutions to gather insights 
            that shape policies, improve services, and build stronger communities.
          </p>
          <p className="text-gray-600 text-sm">
            Every question you answer earns you coins that can be converted to real money. Your responses are completely 
            anonymous and used only in aggregated form to generate actionable insights for decision makers.
          </p>
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questionSet.questions.length}
            </div>
            <div className="flex items-center gap-2">
              {isQuestionAnswered && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  ✓ Answered
                </span>
              )}
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                5 coins
              </span>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold leading-snug mb-4">
            {currentQuestion.text}
          </h2>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${((currentQuestionIndex + (isQuestionAnswered ? 1 : 0)) / questionSet.questions.length) * 100}%` 
              }}
            />
          </div>

          {/* Why We Ask This */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3 text-gray-900">
              Why we ask this question
            </h3>
            <div 
              ref={explanationRef}
              className="border rounded-lg bg-gray-50 p-4 max-h-[40vh] overflow-y-auto"
            >
              <div className="space-y-3">
                {currentQuestion.explanation.map((paragraph, index) => (
                  <p key={index} className="text-sm text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                <div ref={bottomMarkerRef} className="h-1 w-full" />
              </div>
            </div>
          </div>

          {/* Answer Choices */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3 text-gray-900">
              Choose the option that best describes your situation
            </h3>
            <div className="grid gap-3">
              {currentQuestion.choices.map((choice, index) => (
                <label
                  key={index}
                  className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all hover:bg-gray-50 ${
                    selectedChoice === index
                      ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-200'
                      : 'border-gray-200'
                  } ${isQuestionAnswered ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  <input
                    type="radio"
                    name={`choice-${currentQuestion.id}`}
                    checked={selectedChoice === index}
                    onChange={() => !isQuestionAnswered && setSelectedChoice(index)}
                    disabled={isQuestionAnswered}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {choice}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Survey Impact Info */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="text-amber-600 text-lg">💡</div>
              <div>
                <h4 className="text-sm font-medium text-amber-800 mb-1">
                  Your Impact
                </h4>
                <p className="text-xs text-amber-700">
                  By participating in our surveys, you're contributing to data-driven decisions that improve 
                  infrastructure, services, and policies in Rwanda. Your anonymous responses help organizations 
                  better serve communities like yours.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons - Fixed at bottom */}
        <div 
          ref={actionButtonsRef}
          className="sticky bottom-0 bg-gradient-to-t from-white via-white to-white/90 border-t p-4"
        >
          <div className="flex items-center justify-between mb-3 text-xs text-gray-600">
            <div>
              {isQuestionAnswered ? "Answer submitted" : "Not answered yet"}
            </div>
            <div>
              Balance: {((user as any)?.balance || 0)} coins (~{((user as any)?.balance || 0) * 2} RWF)
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={handleSkipQuestion}
              className="text-sm"
              disabled={submitting}
            >
              Skip (no reward)
            </Button>

            {!isQuestionAnswered ? (
              <Button
                onClick={handleAnswerSubmission}
                disabled={!canSubmitAnswer || submitting}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all"
              >
                {submitting ? "Submitting..." : "Submit & Earn 5 Coins"}
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
              >
                {isLastQuestion ? "Complete Survey Set" : "Next Question"}
              </Button>
            )}
          </div>

          {!hasScrolledToBottom && !isQuestionAnswered && (
            <p className="text-xs text-gray-500 mt-2 text-center">
              Please read through the explanation above to enable the submit button
            </p>
          )}
        </div>
      </div>

      {/* Platform Benefits */}
      <div className="rounded-xl border bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Why Choose Our Survey Platform?
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl mb-2">🔒</div>
            <h4 className="font-medium text-gray-900 mb-1">Privacy First</h4>
            <p className="text-sm text-gray-600">Your responses are completely anonymous and secure</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">💰</div>
            <h4 className="font-medium text-gray-900 mb-1">Real Rewards</h4>
            <p className="text-sm text-gray-600">Earn coins that convert to real money</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🌍</div>
            <h4 className="font-medium text-gray-900 mb-1">Make Impact</h4>
            <p className="text-sm text-gray-600">Shape policies and improve community services</p>
          </div>
        </div>
      </div>
    </div>
  );
}