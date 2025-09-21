import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useWallet } from "@/hooks/useWallet";
import { toast } from "sonner";

type Question = {
  _id: string;
  id: string;
  text: string;
  choices: string[];
  createdAt?: string;
};

type QuestionSet = {
  questions: Question[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalQuestions: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
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

// Survey Service - Backend API integration
class SurveyService {
  private static readonly API_BASE_URL = "https://pulse-survey-backend-1.onrender.com/api";

  // Fetch questions from backend
  static async fetchQuestionSet(page: number = 1): Promise<QuestionSet> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/questions?page=${page}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch questions: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch questions error:', error);
      throw new Error('Failed to fetch question set');
    }
  }

  // Submit answer to backend
  static async submitAnswer(questionId: string, choice: string): Promise<{ success: boolean; coinsEarned: number; message?: string }> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/answers/submit`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId,
          choice
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to submit answer: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        coinsEarned: data.coinsEarned || 5,
        message: data.message
      };
    } catch (error) {
      console.error('Submit answer error:', error);
      throw error;
    }
  }
}

export default function SurveyFlow() {
  const { user, refetch: refetchAuth } = useAuth();
  const { refetch: refetchWallet } = useWallet(Boolean(user));

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [questionSet, setQuestionSet] = useState<QuestionSet | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());
  
  // Time tracking states
  const [questionTimings, setQuestionTimings] = useState<QuestionTiming[]>([]);
  const [currentQuestionStartTime, setCurrentQuestionStartTime] = useState<number | null>(null);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const [timeWarningCountdown, setTimeWarningCountdown] = useState(0);
  
  const actionButtonsRef = useRef<HTMLDivElement | null>(null);

  // Initialize survey on component mount
  useEffect(() => {
    initializeSurvey();
  }, []);

  // Reset selection when question changes
  useEffect(() => {
    setSelectedChoice(null);
    
    // Start timing for the new question
    const startTime = Date.now();
    setCurrentQuestionStartTime(startTime);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentQuestionIndex]);

  const initializeSurvey = async (page: number = 1) => {
    try {
      setLoading(true);
      const newQuestionSet = await SurveyService.fetchQuestionSet(page);
      setQuestionSet(newQuestionSet);
      setCurrentPage(page);
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
        selectedAnswer
      );

      if (result.success) {
        // Update local state
        setAnsweredQuestions(prev => new Set([...prev, currentQuestion.id]));
        setQuestionTimings(prev => [...prev, newTiming]);
        
        toast.success(`+${result.coinsEarned} coins earned!`, {
          description: result.message || "Thank you for your valuable response"
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
      toast.error(error instanceof Error ? error.message : "Failed to submit answer. Please try again.");
      console.error('Answer submission error:', error);
    } finally {
      setSubmitting(false);
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
          setTimeout(() => {
            if (questionSet?.pagination.hasNextPage) {
              initializeSurvey(currentPage + 1);
            } else {
              initializeSurvey(1); // Start from page 1 again
            }
          }, 500);
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
      // Survey page completed - check if user spent enough time
      const totalTimeSpent = calculateTotalTimeSpent(questionTimings);
      const minRequiredTime = 40 * 1000; // 40 seconds in milliseconds
      
      if (totalTimeSpent < minRequiredTime) {
        const remainingTime = Math.ceil((minRequiredTime - totalTimeSpent) / 1000);
        showTimeWarningModal(remainingTime);
        return;
      }
      
      // User spent enough time - load next page or start over
      toast.success("Survey page completed! Loading new questions...");
      setTimeout(() => {
        if (questionSet.pagination.hasNextPage) {
          initializeSurvey(currentPage + 1);
        } else {
          initializeSurvey(1); // Start from page 1 again
        }
      }, 1000);
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
      
      if (questionSet.pagination.hasNextPage) {
        initializeSurvey(currentPage + 1);
      } else {
        initializeSurvey(1);
      }
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
          <Button onClick={() => initializeSurvey()} className="mt-4">
            Retry Loading
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = questionSet.questions[currentQuestionIndex];
  const isQuestionAnswered = answeredQuestions.has(currentQuestion.id);
  const canSubmitAnswer = selectedChoice !== null && !isQuestionAnswered;
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
            Welcome to our survey platform where your opinions contribute to valuable market research and insights. 
            We partner with leading organizations, companies, and research institutions to gather data that helps 
            improve products, services, and decision-making processes.
          </p>
          <p className="text-gray-600 text-sm">
            Each question you answer earns you coins that can be converted to real money. Your responses are completely 
            anonymous and used only in aggregated form to generate insights for our partner organizations.
          </p>
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questionSet.questions.length} 
              {questionSet.pagination && (
                <span className="ml-2">
                  (Page {questionSet.pagination.currentPage} of {questionSet.pagination.totalPages})
                </span>
              )}
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

          {/* General Survey Purpose */}
          <div className="mb-6">
            <div className="border rounded-lg bg-gray-50 p-4">
              <div className="flex items-start gap-3">
                <div className="text-blue-600 text-lg">📊</div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Why Your Response Matters
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Your responses help companies and organizations better understand consumer behavior, 
                    market trends, and user preferences. This valuable data enables businesses to make 
                    informed decisions, improve their products and services, and better serve their customers. 
                    All responses are kept completely anonymous and are only used in aggregated statistical analysis.
                  </p>
                </div>
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
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="text-green-600 text-lg">💡</div>
              <div>
                <h4 className="text-sm font-medium text-green-800 mb-1">
                  Your Impact
                </h4>
                <p className="text-xs text-green-700">
                  By participating in our surveys, you're contributing to valuable market research that helps 
                  businesses make better decisions, improve their offerings, and create products that better 
                  meet customer needs. Your anonymous feedback makes a real difference.
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
                {isLastQuestion ? 
                  (questionSet.pagination?.hasNextPage ? "Next Page" : "Complete Survey Set") : 
                  "Next Question"
                }
              </Button>
            )}
          </div>
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
            <div className="text-2xl mb-2">📈</div>
            <h4 className="font-medium text-gray-900 mb-1">Make Impact</h4>
            <p className="text-sm text-gray-600">Help companies improve their products and services</p>
          </div>
        </div>
      </div>
    </div>
  );
}