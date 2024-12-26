import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

export function QuestionInputForm({
  onSubmit,
  questionIndex,
  totalQuestions,
  onCancel,
}) {
  const [questionData, setQuestionData] = React.useState({
    questionText: "",
    options: ["", "", "", ""],
    correctOption: null, // Will save as 1-4
  });

  const handleQuestionChange = (event) => {
    setQuestionData({ ...questionData, questionText: event.target.value });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...questionData.options];
    updatedOptions[index] = value;
    setQuestionData({ ...questionData, options: updatedOptions });
  };

  const handleCorrectOptionChange = (value) => {
    setQuestionData({ ...questionData, correctOption: Number(value) });
  };
  
  const { toast } = useToast();

  const submitForm = () => {
    const { questionText, options, correctOption } = questionData;
    if (!questionText || options.some((opt) => !opt) || correctOption === null) {
      // alert("Please fill out the question, all options, and select a correct answer.");
      toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Please fill out the question, all options, and select a correct answer.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      return;
    }
    onSubmit(questionData); // Submit the question data to the parent
    setQuestionData({ questionText: "", options: ["", "", "", ""], correctOption: null }); // Reset the form
  };

  return (
    <div className="flex items-center justify-center" style={{ minHeight: `calc(100vh - 64px)` }}>
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Question {questionIndex}/{totalQuestions}</CardTitle>
          <CardDescription>Provide question details, options, and the correct answer</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="questionText">Question</Label>
                <Input
                  id="questionText"
                  value={questionData.questionText}
                  onChange={handleQuestionChange}
                  placeholder="Enter your question"
                  required
                />
              </div>
              {questionData.options.map((option, index) => (
                <div key={index} className="flex flex-col space-y-1.5">
                  <Label htmlFor={`option-${index + 1}`}>Option {index + 1}</Label>
                  <Input
                    id={`option-${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Enter option ${index + 1}`}
                    required
                  />
                </div>
              ))}
              <div className="flex flex-col space-y-1.5">
                <Label>Correct Option</Label>
                <RadioGroup
                  value={questionData.correctOption}
                  onValueChange={handleCorrectOptionChange}
                  className="flex flex-col space-y-2"
                >
                  {questionData.options.map((_, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={(index + 1).toString()} // Save correct option as 1-4
                        id={`correctOption-${index + 1}`}
                      />
                      <Label htmlFor={`correctOption-${index + 1}`}>
                        Option {index + 1}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onCancel} type="button">
            Cancel
          </Button>
          <Button onClick={submitForm}>Submit Question</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default QuestionInputForm;

