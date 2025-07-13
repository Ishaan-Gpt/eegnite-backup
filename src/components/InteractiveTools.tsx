import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calculator, BarChart3, Target, Zap, ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

export function InteractiveTools() {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="canvas-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-clash font-bold text-foreground mb-6">
            Free <span className="gradient-text">Growth Tools</span>
          </h2>
          <p className="text-xl text-muted-foreground font-inter max-w-3xl mx-auto">
            Get instant insights with our professional-grade marketing calculators and assessment tools.
          </p>
        </motion.div>

        <Tabs defaultValue="roi-calculator" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-12 glass p-2 rounded-2xl">
            <TabsTrigger 
              value="roi-calculator" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl font-inter font-semibold"
            >
              <Calculator className="w-4 h-4 mr-2" />
              ROI Calculator
            </TabsTrigger>
            <TabsTrigger 
              value="audit-tool" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl font-inter font-semibold"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Marketing Audit
            </TabsTrigger>
            <TabsTrigger 
              value="lead-quiz" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl font-inter font-semibold"
            >
              <Target className="w-4 h-4 mr-2" />
              Lead Score Quiz
            </TabsTrigger>
          </TabsList>

          <TabsContent value="roi-calculator">
            <ROICalculator />
          </TabsContent>
          
          <TabsContent value="audit-tool">
            <MarketingAudit />
          </TabsContent>
          
          <TabsContent value="lead-quiz">
            <LeadScoreQuiz />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function ROICalculator() {
  const [values, setValues] = useState({
    monthlySpend: '',
    conversionRate: '',
    averageOrderValue: '',
    customerLifetimeValue: ''
  });
  const [results, setResults] = useState<any>(null);

  const calculateROI = () => {
    const spend = parseFloat(values.monthlySpend);
    const rate = parseFloat(values.conversionRate) / 100;
    const aov = parseFloat(values.averageOrderValue);
    const clv = parseFloat(values.customerLifetimeValue);

    if (spend && rate && aov) {
      const monthlyRevenue = spend * rate * aov;
      const monthlyProfit = monthlyRevenue - spend;
      const roi = (monthlyProfit / spend) * 100;
      
      setResults({
        monthlyRevenue: monthlyRevenue.toFixed(0),
        monthlyProfit: monthlyProfit.toFixed(0),
        roi: roi.toFixed(1),
        yearlyProfit: (monthlyProfit * 12).toFixed(0)
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      <Card className="neumorphism hover-lift p-8">
        <CardHeader>
          <CardTitle className="font-clash text-2xl gradient-text">Calculate Your Marketing ROI</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="font-inter font-medium">Monthly Marketing Spend ($)</Label>
            <Input
              value={values.monthlySpend}
              onChange={(e) => setValues({...values, monthlySpend: e.target.value})}
              placeholder="5000"
              className="neumorphism-inset mt-2"
            />
          </div>
          
          <div>
            <Label className="font-inter font-medium">Conversion Rate (%)</Label>
            <Input
              value={values.conversionRate}
              onChange={(e) => setValues({...values, conversionRate: e.target.value})}
              placeholder="2.5"
              className="neumorphism-inset mt-2"
            />
          </div>
          
          <div>
            <Label className="font-inter font-medium">Average Order Value ($)</Label>
            <Input
              value={values.averageOrderValue}
              onChange={(e) => setValues({...values, averageOrderValue: e.target.value})}
              placeholder="150"
              className="neumorphism-inset mt-2"
            />
          </div>

          <Button 
            onClick={calculateROI}
            className="w-full neumorphism hover-glow py-3 font-inter font-semibold"
            style={{ background: 'var(--gradient-orange)' }}
          >
            <Zap className="w-4 h-4 mr-2" />
            Calculate ROI
          </Button>
        </CardContent>
      </Card>

      <Card className="neumorphism p-8">
        <CardHeader>
          <CardTitle className="font-clash text-2xl">Your Results</CardTitle>
        </CardHeader>
        <CardContent>
          {results ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-strong p-4 rounded-2xl text-center">
                  <div className="text-2xl font-clash font-bold gradient-text">
                    ${results.monthlyRevenue}
                  </div>
                  <div className="text-sm text-muted-foreground font-inter">Monthly Revenue</div>
                </div>
                
                <div className="glass-strong p-4 rounded-2xl text-center">
                  <div className="text-2xl font-clash font-bold text-green-400">
                    ${results.monthlyProfit}
                  </div>
                  <div className="text-sm text-muted-foreground font-inter">Monthly Profit</div>
                </div>
                
                <div className="glass-strong p-4 rounded-2xl text-center">
                  <div className="text-3xl font-clash font-bold gradient-text">
                    {results.roi}%
                  </div>
                  <div className="text-sm text-muted-foreground font-inter">ROI</div>
                </div>
                
                <div className="glass-strong p-4 rounded-2xl text-center">
                  <div className="text-2xl font-clash font-bold text-green-400">
                    ${results.yearlyProfit}
                  </div>
                  <div className="text-sm text-muted-foreground font-inter">Yearly Profit</div>
                </div>
              </div>

              <Button 
                asChild
                className="w-full glass hover-lift font-inter font-semibold"
              >
                <Link to="/contact">
                  Get My Custom Growth Plan
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="font-inter">Enter your data to see projected results</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function MarketingAudit() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "How would you rate your current website conversion rate?",
      options: ["Excellent (5%+)", "Good (2-5%)", "Average (1-2%)", "Poor (<1%)"]
    },
    {
      question: "How often do you track your marketing metrics?",
      options: ["Daily", "Weekly", "Monthly", "Rarely/Never"]
    },
    {
      question: "What's your biggest marketing challenge?",
      options: ["Lead Generation", "Conversion Optimization", "Customer Retention", "Brand Awareness"]
    },
    {
      question: "How much do you spend on marketing monthly?",
      options: ["$10,000+", "$5,000-$10,000", "$1,000-$5,000", "Under $1,000"]
    }
  ];

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const getAuditScore = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (index === 0) score += answer.includes('Excellent') ? 25 : answer.includes('Good') ? 20 : answer.includes('Average') ? 15 : 10;
      if (index === 1) score += answer === 'Daily' ? 25 : answer === 'Weekly' ? 20 : answer === 'Monthly' ? 15 : 10;
      if (index === 2) score += 15; // All answers get equal points for challenge identification
      if (index === 3) score += answer.includes('$10,000+') ? 25 : answer.includes('$5,000') ? 20 : answer.includes('$1,000') ? 15 : 10;
    });
    return Math.min(score, 100);
  };

  return (
    <Card className="neumorphism hover-lift p-8 max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="font-clash text-2xl gradient-text text-center">
          Free Marketing Audit
        </CardTitle>
        <p className="text-center text-muted-foreground font-inter">
          Get a personalized assessment of your marketing performance
        </p>
      </CardHeader>
      <CardContent>
        {!showResults ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="mb-6">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(((currentQuestion) / questions.length) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${((currentQuestion) / questions.length) * 100}%`,
                    background: 'var(--gradient-orange)'
                  }}
                />
              </div>
            </div>

            <h3 className="text-xl font-clash font-semibold">
              {questions[currentQuestion].question}
            </h3>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left justify-start glass hover-lift p-4 h-auto"
                  variant="ghost"
                >
                  {option}
                </Button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="neumorphism p-8 rounded-3xl">
              <div className="text-5xl font-clash font-bold gradient-text mb-2">
                {getAuditScore()}%
              </div>
              <div className="text-lg font-inter font-semibold">Marketing Health Score</div>
            </div>

            <div className="space-y-4 text-left">
              <h4 className="font-clash font-semibold text-lg">Your Audit Results:</h4>
              <div className="grid gap-3">
                {answers.map((answer, index) => (
                  <div key={index} className="glass p-3 rounded-xl">
                    <div className="font-inter font-medium text-sm text-muted-foreground">
                      {questions[index].question}
                    </div>
                    <div className="font-inter font-semibold">{answer}</div>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              asChild
              className="w-full neumorphism hover-glow py-3 font-inter font-semibold"
              style={{ background: 'var(--gradient-orange)' }}
            >
              <Link to="/contact">
                Get Detailed Analysis & Recommendations
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

function LeadScoreQuiz() {
  const [responses, setResponses] = useState<{[key: string]: string}>({});
  const [showScore, setShowScore] = useState(false);

  const questions = [
    {
      id: 'company_size',
      question: "What's your company size?",
      options: [
        { value: 'startup', label: 'Startup (1-10 employees)', score: 20 },
        { value: 'small', label: 'Small Business (11-50 employees)', score: 40 },
        { value: 'medium', label: 'Medium Business (51-200 employees)', score: 60 },
        { value: 'large', label: 'Large Enterprise (200+ employees)', score: 80 }
      ]
    },
    {
      id: 'revenue',
      question: "What's your annual revenue?",
      options: [
        { value: 'under_100k', label: 'Under $100K', score: 20 },
        { value: '100k_500k', label: '$100K - $500K', score: 40 },
        { value: '500k_1m', label: '$500K - $1M', score: 60 },
        { value: 'over_1m', label: 'Over $1M', score: 80 }
      ]
    },
    {
      id: 'urgency',
      question: "How urgent is your need for marketing help?",
      options: [
        { value: 'immediate', label: 'Immediate (This month)', score: 80 },
        { value: 'soon', label: 'Soon (Within 3 months)', score: 60 },
        { value: 'planning', label: 'Planning (3-6 months)', score: 40 },
        { value: 'exploring', label: 'Just exploring', score: 20 }
      ]
    }
  ];

  const calculateScore = () => {
    let totalScore = 0;
    questions.forEach(question => {
      const response = responses[question.id];
      if (response) {
        const option = question.options.find(opt => opt.value === response);
        if (option) totalScore += option.score;
      }
    });
    return totalScore;
  };

  const getScoreLevel = (score: number) => {
    if (score >= 200) return { level: 'Hot Lead', color: 'text-red-400', description: 'Perfect fit for our premium services!' };
    if (score >= 150) return { level: 'Warm Lead', color: 'text-orange-400', description: 'Great potential for growth partnership.' };
    if (score >= 100) return { level: 'Qualified Lead', color: 'text-yellow-400', description: 'Good fit for our growth programs.' };
    return { level: 'Cold Lead', color: 'text-blue-400', description: 'Let\'s explore how we can help you grow.' };
  };

  return (
    <Card className="neumorphism hover-lift p-8 max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="font-clash text-2xl gradient-text text-center">
          Lead Qualification Quiz
        </CardTitle>
        <p className="text-center text-muted-foreground font-inter">
          Discover your growth potential and get personalized recommendations
        </p>
      </CardHeader>
      <CardContent>
        {!showScore ? (
          <div className="space-y-8">
            {questions.map((question, index) => (
              <div key={question.id}>
                <h3 className="text-lg font-clash font-semibold mb-4">
                  {index + 1}. {question.question}
                </h3>
                <div className="space-y-2">
                  {question.options.map((option) => (
                    <Button
                      key={option.value}
                      onClick={() => setResponses({...responses, [question.id]: option.value})}
                      variant={responses[question.id] === option.value ? "default" : "ghost"}
                      className={`w-full text-left justify-start glass hover-lift p-4 h-auto ${
                        responses[question.id] === option.value 
                          ? 'bg-primary text-primary-foreground' 
                          : ''
                      }`}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            ))}

                  <Button 
                    asChild
                    disabled={Object.keys(responses).length < questions.length}
                    className="w-full neumorphism hover-glow py-3 font-inter font-semibold"
                    style={{ background: 'var(--gradient-orange)' }}
                  >
                    <Link to="/contact">
                      Get My Lead Score
                      <Target className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            {(() => {
              const score = calculateScore();
              const scoreData = getScoreLevel(score);
              return (
                <>
                  <div className="neumorphism p-8 rounded-3xl">
                    <div className="text-4xl font-clash font-bold gradient-text mb-2">
                      {score}/240
                    </div>
                    <div className={`text-xl font-clash font-semibold ${scoreData.color}`}>
                      {scoreData.level}
                    </div>
                    <div className="text-muted-foreground font-inter mt-2">
                      {scoreData.description}
                    </div>
                  </div>

                  <Button 
                    className="w-full neumorphism hover-glow py-3 font-inter font-semibold"
                    style={{ background: 'var(--gradient-orange)' }}
                  >
                    Get Personalized Growth Strategy
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </>
              );
            })()}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}