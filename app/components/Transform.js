import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ToastContainer, toast } from "react-toastify";

const ContactForm = ({handleGenerateVoiceover}) => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const formSteps = ["name", "company"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (currentStep < formSteps.length - 1) {
      if(formData[formSteps[currentStep]] === ""){
        toast.error(`Please enter your ${formSteps[currentStep]}`,{
          position: toast.POSITION.TOP_CENTER,
        })
        setCurrentStep(currentStep);  
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep === formSteps.length - 1) {
      const isFormEmpty = Object.values(formData).some((value) => value === "");
      if(isFormEmpty){
        toast.error("Please fill in all fields",{
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        // console.log("Form data:", formData);
        setIsSubmitted(true);
        handleGenerateVoiceover(formData.name, formData.company)
        // alert(`Hello ${formData.name} Form submitted!`);
      }
    }
  };

  const handleClear = () => {
    setFormData({
      name: "",
      company: "",
    });
    setIsSubmitted(false);
    setCurrentStep(0);
  };

  return (
    <div className="w-96 mx-auto mt-8 p-4 bg-white shadow-md rounded-lg text-gray-700">
      <h2 className="text-2xl font-semibold mb-4">Please Introduce Yourself</h2>
      <form onSubmit={handleSubmit}>
        <TransitionGroup>
          {currentStep < formSteps.length && (
            <CSSTransition
              key={formSteps[currentStep]}
              classNames="form-field"
              timeout={500}
            >
              <div className="mb-4">
                <label
                  htmlFor={formSteps[currentStep]}
                  className="block text-sm font-medium text-gray-700"
                >
                  {formSteps[currentStep].charAt(0).toUpperCase() +
                    formSteps[currentStep].slice(1)}
                </label>
                <input
                  type={formSteps[currentStep] === "text"}
                  id={formSteps[currentStep]}
                  name={formSteps[currentStep]}
                  value={formData[formSteps[currentStep]]}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>

        {currentStep < formSteps.length - 1 && (
          <div>
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-800"
            >
              Next
            </button>
          </div>
        )}

        {currentStep === formSteps.length - 1 && (
          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-800"
            >
              Generate your video
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 ml-2 bg-red-600 text-white rounded-md hover:bg-red-800"
            >
              Clear
            </button>
          </div>
        )}
      </form>

      {isSubmitted && (
        <div className="animate__animated animate__bounceIn text-green-500 mt-4">
          Thanks for submitting the form!
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default ContactForm;
