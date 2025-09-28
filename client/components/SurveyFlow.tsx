import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useWallet } from "@/hooks/useWallet";
import { makeAuthenticatedRequest } from "@/hooks/useAuth";
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

// Survey Service - Backend API integration with authentication
class SurveyService {
  private static readonly API_BASE_URL = "https://pulse-survey-backend.onrender.com/api";
  private static readonly QUESTIONS_PER_BATCH = 10; // Fetch 10 questions at once

  // Fetch questions from backend with authentication
  static async fetchQuestionSet(page: number = 1): Promise<QuestionSet> {
    try {
      const response = await makeAuthenticatedRequest(
        `${this.API_BASE_URL}/questions?page=${page}&limit=${this.QUESTIONS_PER_BATCH}`
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication required. Please log in.');
        }
        throw new Error(`Failed to fetch questions: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch questions error:', error);
      if (error instanceof Error && error.message.includes('Authentication')) {
        throw error;
      }
      throw new Error('Failed to fetch question set');
    }
  }

  // Submit answer to backend with authentication
  static async submitAnswer(
    questionId: string, 
    choice: string,
    metadata?: {
      duration?: number;
      startTime?: number;
      endTime?: number;
    }
  ): Promise<{ success: boolean; coinsEarned: number; message?: string; newBalance?: number }> {
    try {
      const response = await makeAuthenticatedRequest(
        `${this.API_BASE_URL}/answers/submit`,
        {
          method: 'POST',
          body: JSON.stringify({
            questionId,
            choice,
            answeredAt: Date.now(),
            metadata: {
              ...metadata,
              userAgent: navigator.userAgent,
              timestamp: new Date().toISOString()
            }
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Session expired. Please log in again.');
        }
        if (response.status === 400) {
          const errorData = await response.json().catch(() => ({}));
          if (errorData.code === 'ALREADY_ANSWERED') {
            throw new Error('You have already answered this question.');
          }
          if (errorData.code === 'INVALID_QUESTION') {
            throw new Error('Invalid question. Please refresh and try again.');
          }
          if (errorData.code === 'INVALID_CHOICE') {
            throw new Error('Invalid choice selected. Please try again.');
          }
          throw new Error(errorData.error || 'Invalid request');
        }
        if (response.status === 429) {
          throw new Error('You are submitting answers too quickly. Please slow down.');
        }

        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to submit answer: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        coinsEarned: data.coinsEarned || 5,
        message: data.message,
        newBalance: data.newBalance
      };
    } catch (error) {
      console.error('Submit answer error:', error);
      throw error;
    }
  }

  // Get user's answer history for a question (to check if already answered)
  static async checkAnswerStatus(questionId: string): Promise<{ hasAnswered: boolean; answer?: string }> {
    try {
      const response = await makeAuthenticatedRequest(
        `${this.API_BASE_URL}/answers/status/${questionId}`
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication required');
        }
        if (response.status === 404) {
          return { hasAnswered: false };
        }
        throw new Error('Failed to check answer status');
      }

      const data = await response.json();
      return {
        hasAnswered: data.hasAnswered || false,
        answer: data.answer
      };
    } catch (error) {
      console.error('Check answer status error:', error);
      return { hasAnswered: false };
    }
  }
}

export default function SurveyFlow() {
  const { user, refetch: refetchAuth, token } = useAuth();
  const { refetch: refetchWallet } = useWallet(Boolean(user));

  const [loading, setLoading] = useState(true);
  const [loadingNewBatch, setLoadingNewBatch] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [questionSet, setQuestionSet] = useState<QuestionSet | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<Map<string, string>>(new Map());
  
  // Time tracking states
  const [questionTimings, setQuestionTimings] = useState<QuestionTiming[]>([]);
  const [currentQuestionStartTime, setCurrentQuestionStartTime] = useState<number | null>(null);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const [timeWarningCountdown, setTimeWarningCountdown] = useState(0);
  const [batchStartTime, setBatchStartTime] = useState<number>(Date.now());
  
  const actionButtonsRef = useRef<HTMLDivElement | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!token && !user) {
      toast.error('Please log in to participate in surveys');
      window.location.href = '/login';
      return;
    }
  }, [user, token]);

  // Initialize survey on component mount
  useEffect(() => {
    if (user && token) {
      initializeSurvey();
    }
  }, [user, token]);

  // Reset selection when question changes
  useEffect(() => {
    setSelectedChoice(null);
    
    // Start timing for the new question
    const startTime = Date.now();
    setCurrentQuestionStartTime(startTime);
    
    // Check if current question was already answered
    if (questionSet && questionSet.questions[currentQuestionIndex]) {
      checkCurrentQuestionStatus();
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentQuestionIndex, questionSet]);

  const checkCurrentQuestionStatus = async () => {
    if (!questionSet || !user) return;
    
    const currentQuestion = questionSet.questions[currentQuestionIndex];
    try {
      const status = await SurveyService.checkAnswerStatus(currentQuestion.id);
      if (status.hasAnswered && status.answer) {
        setAnsweredQuestions(prev => new Map(prev.set(currentQuestion.id, status.answer)));
      }
    } catch (error) {
      console.warn('Failed to check answer status:', error);
    }
  };

  const initializeSurvey = async (page: number = 1) => {
    if (!user || !token) {
      toast.error('Authentication required');
      window.location.href = '/login';
      return;
    }

    try {
      setLoading(true);
      const newQuestionSet = await SurveyService.fetchQuestionSet(page);
      setQuestionSet(newQuestionSet);
      setCurrentPage(page);
      setCurrentQuestionIndex(0);
      setAnsweredQuestions(new Map());
      setQuestionTimings([]);
      setCurrentQuestionStartTime(Date.now());
      setBatchStartTime(Date.now());
      setShowTimeWarning(false);
      setTimeWarningCountdown(0);

      // Check answer status for all questions in the batch
      setTimeout(async () => {
        await checkAllQuestionsStatus(newQuestionSet.questions);
      }, 100);
    } catch (error) {
      if (error instanceof Error && error.message.includes('Authentication')) {
        toast.error('Your session has expired. Please log in again.');
        window.location.href = '/login';
        return;
      }
      toast.error('Failed to load survey questions');
      console.error('Survey initialization error:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkAllQuestionsStatus = async (questions: Question[]) => {
    try {
      const statusChecks = await Promise.allSettled(
        questions.map(question => SurveyService.checkAnswerStatus(question.id))
      );

      const newAnsweredQuestions = new Map(answeredQuestions);
      statusChecks.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value.hasAnswered && result.value.answer) {
          newAnsweredQuestions.set(questions[index].id, result.value.answer);
        }
      });

      setAnsweredQuestions(newAnsweredQuestions);
    } catch (error) {
      console.warn('Failed to check questions status:', error);
    }
  };

  const loadNextBatch = async () => {
    // After completing 5 questions, always reload the page to get fresh questions
    const answeredCount = answeredQuestions.size;
    const minAnsweredRequired = 5;

    if (answeredCount >= minAnsweredRequired) {
      // Check if minimum time has passed (35 seconds)
      const timeElapsed = Date.now() - batchStartTime;
      const minRequiredTime = 35 * 1000; // 35 seconds in milliseconds
      
      if (timeElapsed < minRequiredTime) {
        const remainingTime = Math.ceil((minRequiredTime - timeElapsed) / 1000);
        showTimeWarningModal(remainingTime);
        return;
      }

      // User has completed the minimum requirements, reload page for fresh questions
      toast.success("Great job! You've completed this question set. Loading fresh questions...");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      return;
    }

    // If user hasn't answered enough questions yet, continue with current batch or load next page
    if (!questionSet?.pagination?.hasNextPage) {
      // No more questions available, restart from beginning
      toast.success("Great job! Starting fresh with new questions...");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      return;
    }

    try {
      setLoadingNewBatch(true);
      const nextPage = currentPage + 1;
      const newQuestionSet = await SurveyService.fetchQuestionSet(nextPage);
      
      setQuestionSet(newQuestionSet);
      setCurrentPage(nextPage);
      setCurrentQuestionIndex(0);
      setQuestionTimings([]);
      setBatchStartTime(Date.now());

      // Check answer status for new batch
      setTimeout(async () => {
        await checkAllQuestionsStatus(newQuestionSet.questions);
      }, 100);

      toast.success(`Loaded ${newQuestionSet.questions.length} new questions!`);
    } catch (error) {
      toast.error('Failed to load new questions');
      console.error('Load next batch error:', error);
    } finally {
      setLoadingNewBatch(false);
    }
  };

  const handleAnswerSubmission = async () => {
    if (!questionSet || !user || !token || selectedChoice === null || !currentQuestionStartTime) {
      if (!user || !token) {
        toast.error('Please log in to submit answers');
        window.location.href = "/login";
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
        selectedAnswer,
        {
          duration,
          startTime: currentQuestionStartTime,
          endTime
        }
      );

      if (result.success) {
        // Update local state
        setAnsweredQuestions(prev => new Map(prev.set(currentQuestion.id, selectedAnswer)));
        setQuestionTimings(prev => [...prev, newTiming]);
        
        toast.success(`+${result.coinsEarned} coins earned!`, {
          description: result.message || "Thank you for your valuable response"
        });

        // Refresh auth and wallet data to get updated balance
        try {
          await Promise.all([refetchAuth(), refetchWallet()]);
        } catch (error) {
          console.warn('Failed to refresh user data:', error);
        }

        // Automatically move to next question after successful submission
        setTimeout(() => {
          handleNextQuestion();
        }, 1500);
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('Session expired') || error.message.includes('Authentication')) {
          toast.error('Your session has expired. Please log in again.');
          window.location.href = '/login';
          return;
        }
        toast.error(error.message);
      } else {
        toast.error("Failed to submit answer. Please try again.");
      }
      console.error('Answer submission error:', error);
    } finally {
      setSubmitting(false);
    }
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
          // Auto-reload page after countdown to get fresh questions
          toast.success("Thank you for your patience! Loading fresh questions...");
          setTimeout(() => {
            window.location.reload();
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
      // Move to next question in current batch
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // End of current batch - check if user has answered at least 5 questions
      const answeredCount = answeredQuestions.size;
      const minAnsweredRequired = 5;

      if (answeredCount >= minAnsweredRequired) {
        // Check if minimum time has passed (35 seconds)
        const timeElapsed = Date.now() - batchStartTime;
        const minRequiredTime = 35 * 1000; // 35 seconds in milliseconds
        
        if (timeElapsed < minRequiredTime) {
          const remainingTime = Math.ceil((minRequiredTime - timeElapsed) / 1000);
          showTimeWarningModal(remainingTime);
          return;
        }

        // User has met all requirements - reload page for fresh questions
        toast.success("Excellent! You've completed this set. Reloading with fresh questions...");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        // User hasn't answered enough questions yet
        toast.error(`Please answer at least ${minAnsweredRequired} questions before proceeding to the next set.`);
      }
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

    // Move to next question
    if (currentQuestionIndex < questionSet.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // End of batch
      loadNextBatch();
    }
  };

  // Convert coins to RWF (5 coins = 3 RWF)
  const convertCoinsToRWF = (coins: number): number => {
    return Math.floor((coins * 3) / 5);
  };

  // Show authentication required message
  if (!user || !token) {
    return (
      <div className="rounded-xl border p-8 bg-card shadow-sm">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Authentication Required
          </h3>
          <p className="text-muted-foreground mb-4">
            Please log in to participate in surveys and earn coins.
          </p>
          <div className="flex gap-2 justify-center">
            <Button onClick={() => window.location.href = '/login'}>
              Log In
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/signup'}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
  const answeredInBatch = Array.from(answeredQuestions.keys()).filter(id => 
    questionSet.questions.some(q => q.id === id)
  ).length;

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
                To ensure quality responses and prevent rushing, we require at least 35 seconds total time for each batch of questions. 
                This helps us maintain the integrity of our survey data.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                <p className="text-amber-800 text-sm font-medium">
                  Please wait {timeWarningCountdown} more seconds before continuing
                </p>
                <div className="mt-2 w-full bg-amber-200 rounded-full h-2">
                  <div 
                    className="bg-amber-600 h-2 rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${Math.max(0, Math.min(100, 100 - (timeWarningCountdown / 35) * 100))}%` }}
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

      {/* Loading New Batch Overlay */}
      {loadingNewBatch && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
          <div className="bg-white rounded-xl shadow-xl p-6 flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-gray-700">Loading new questions...</span>
          </div>
        </div>
      )}

      {/* User Info Bar */}
      <div className="rounded-xl border bg-gradient-to-r from-blue-50 to-indigo-50 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-600">Welcome back, </span>
            <span className="font-medium text-gray-900">{user.display_name}</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="text-gray-600">Balance:</span>
              <span className="font-semibold text-blue-600">{user.balance || 0} coins</span>
            </div>
            <div className="text-gray-500">
              (~{convertCoinsToRWF(user.balance || 0).toLocaleString()} RWF)
            </div>
          </div>
        </div>
      </div>

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
            Each question you answer earns you 5 coins (equivalent to 3 RWF). Your responses are completely 
            anonymous and used only in aggregated form to generate insights for our partner organizations.
          </p>
        </div>
      </div>

      {/* Batch Progress */}
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-900">
            Current Batch Progress
          </h3>
          <span className="text-xs text-gray-500">
            Batch {currentPage} • {questionSet.questions.length} questions loaded
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Answered: {answeredInBatch}</span>
          <span>•</span>
          <span>Remaining: {questionSet.questions.length - answeredInBatch}</span>
          {questionSet.pagination?.hasNextPage && (
            <>
              <span>•</span>
              <span className="text-blue-600">More questions available</span>
            </>
          )}
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questionSet.questions.length}
              <span className="ml-2 text-blue-600">
                (Batch {questionSet.pagination?.currentPage || currentPage})
              </span>
            </div>
            <div className="flex items-center gap-2">
              {isQuestionAnswered && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  ✓ Answered
                </span>
              )}
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                5 coins (3 RWF)
              </span>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold leading-snug mb-4">
            {currentQuestion.text}
          </h2>

          {/* Progress Bar - for current batch */}
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
              {currentQuestion.choices.map((choice, index) => {
                const isSelected = selectedChoice === index;
                const isAlreadyAnswered = isQuestionAnswered && answeredQuestions.get(currentQuestion.id) === choice;
                
                return (
                  <label
                    key={index}
                    className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all hover:bg-gray-50 ${
                      isSelected
                        ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-200'
                        : isAlreadyAnswered
                        ? 'ring-2 ring-green-500 bg-green-50 border-green-200'
                        : 'border-gray-200'
                    } ${isQuestionAnswered ? 'opacity-60 cursor-not-allowed' : ''}`}
                  >
                    <input
                      type="radio"
                      name={`choice-${currentQuestion.id}`}
                      checked={isSelected || isAlreadyAnswered}
                      onChange={() => !isQuestionAnswered && setSelectedChoice(index)}
                      disabled={isQuestionAnswered}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-900">
                      {choice}
                    </span>
                    {isAlreadyAnswered && (
                      <span className="ml-auto text-xs text-green-600 font-medium">
                        ✓ Selected
                      </span>
                    )}
                  </label>
                );
              })}
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
              {isQuestionAnswered ? "Answer submitted" : "Not answered yet"} • 
              Batch progress: {answeredInBatch}/{questionSet.questions.length}
            </div>
            <div>
              Balance: {user.balance || 0} coins (~{convertCoinsToRWF(user.balance || 0).toLocaleString()} RWF)
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={handleSkipQuestion}
              className="text-sm"
              disabled={submitting || loadingNewBatch}
            >
              Skip (no reward)
            </Button>

            {!isQuestionAnswered ? (
              <Button
                onClick={handleAnswerSubmission}
                disabled={!canSubmitAnswer || submitting || loadingNewBatch}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all"
              >
                {submitting ? "Submitting..." : "Submit & Earn 5 Coins (3 RWF)"}
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                disabled={loadingNewBatch}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
              >
                {loadingNewBatch ? "Loading..." : 
                 isLastQuestion ? "Complete Batch & Load New Questions" : "Next Question"}
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
            <p className="text-sm text-gray-600">Earn 5 coins (3 RWF) per question answered</p>
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