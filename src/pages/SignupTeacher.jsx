import React, { useEffect, useState, useRef } from "react";
import "./SignupTeacher.css";

const SignupTeacher = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(false);
  const [messages, setMessages] = useState([]);

  const hasInitialized = useRef(false);
  const chatMessagesRef = useRef(null);
  const recognitionRef = useRef(null);

  const conversationFlow = [
    {
      step: 0,
      label: "Personal Info",
      bot: "Hello! 👋 Welcome to Elderise. I'm here to help you set up your teacher profile.\n\nLet's start with your first name. What should I call you?",
      type: "text",
      key: "firstName",
    },
    {
      step: 1,
      label: "Personal Info",
      bot: "Nice to meet you, {firstName}! 😊\n\nWhat is your last name?",
      type: "text",
      key: "lastName",
    },
    {
      step: 2,
      label: "Personal Info",
      bot: "Thank you! How old are you, {firstName}?",
      type: "text",
      key: "age",
    },
    {
      step: 3,
      label: "Personal Info",
      bot: "Perfect! What is your gender?",
      type: "choice",
      choices: ["Male", "Female", "Other", "Prefer not to say"],
      key: "gender",
    },
    {
      step: 4,
      label: "Professional Info",
      bot: "Great! What is your profession or current occupation?",
      type: "text",
      key: "profession",
    },
    {
      step: 5,
      label: "Professional Info",
      bot: "Wonderful! How many years of experience do you have in your field?",
      type: "text",
      key: "experience",
    },
    {
      step: 6,
      label: "Expertise",
      bot: "Excellent! What skills or expertise would you like to teach?\n\nFor example: Cooking, Handcrafts, Music, Languages, etc.",
      type: "text",
      key: "skills",
    },
    {
      step: 7,
      label: "About You",
      bot: "Tell us a bit about yourself. What makes you a great teacher?\n\n(Share your passion, teaching style, or anything you'd like learners to know about you)",
      type: "text",
      key: "bio",
    },
    {
      step: 8,
      label: "Contact Info",
      bot: "What is your phone number? (We'll use this to keep in touch and for important updates)",
      type: "text",
      key: "phone",
    },
    {
      step: 9,
      label: "Review",
      bot: "Perfect! We have all your information. Are you ready to complete your registration?",
      type: "choice",
      choices: ["Yes, complete my registration", "Review my answers"],
      key: "confirmation",
    },
  ];

  // Initialize
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // Inject Google Font and Font Awesome
    const fontLinkId = "elderise-google-font";
    const faLinkId = "elderise-fa";

    if (!document.getElementById(fontLinkId)) {
      const link = document.createElement("link");
      link.id = fontLinkId;
      link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    if (!document.getElementById(faLinkId)) {
      const link2 = document.createElement("link");
      link2.id = faLinkId;
      link2.rel = "stylesheet";
      link2.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
      document.head.appendChild(link2);
    }

    // Check speech recognition support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) setRecognitionSupported(true);

    // Show first message
    setTimeout(() => {
      showBotMessage(conversationFlow[0], {});
    }, 600);
  }, []);

  // Auto scroll
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const showBotMessage = (stepData, answers) => {
    setIsTyping(true);
    setMessages(prev => [...prev, { type: "typing", id: Date.now() }]);

    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.type !== "typing"));

      let message = stepData.bot;
      if (answers.firstName) {
        message = message.replace(/{firstName}/g, answers.firstName);
      }

      const newMessages = [{ sender: "bot", text: message, id: Date.now() }];
      
      if (stepData.type === "choice") {
        newMessages.push({
          sender: "bot",
          choices: stepData.choices,
          id: Date.now() + 1
        });
      }

      setMessages(prev => [...prev, ...newMessages]);
      setIsTyping(false);
    }, 1200);
  };

  const selectChoice = (choice) => {
    setMessages(prev => prev.filter(m => !m.choices));
    setTimeout(() => {
      sendMessage(choice);
    }, 100);
  };

  const sendMessage = (customMessage = null) => {
    if (isTyping || isRecording) return;

    const input = document.getElementById("messageInput");
    const message = customMessage || (input ? input.value.trim() : "");

    if (!message) return;

    setMessages(prev => [...prev, { sender: "user", text: message, id: Date.now() }]);
    if (input) input.value = "";

    const stepData = conversationFlow[currentStep];
    const updatedAnswers = { ...userAnswers, [stepData.key]: message };
    setUserAnswers(updatedAnswers);

    // Handle confirmation step
    if (stepData.key === "confirmation") {
      if (message === "Yes, complete my registration") {
        setCurrentStep(conversationFlow.length);
        setTimeout(() => {
          showCompletionScreen();
        }, 1000);
        return;
      } else if (message === "Review my answers") {
        setMessages(prev => [...prev, {
          sender: "bot",
          text: "You can review your answers in your profile settings. Let's complete your registration!",
          id: Date.now()
        }]);
        setTimeout(() => {
          setCurrentStep(conversationFlow.length);
          showCompletionScreen();
        }, 1500);
        return;
      }
    }

    // Move to next step
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);

    if (nextStep < conversationFlow.length) {
      setTimeout(() => {
        showBotMessage(conversationFlow[nextStep], updatedAnswers);
      }, 800);
    } else {
      setTimeout(() => {
        showCompletionScreen();
      }, 1000);
    }
  };

  const showCompletionScreen = () => {
    const chatMessages = document.getElementById("chatMessages");
    const chatInput = document.getElementById("chatInput");
    const completionScreen = document.getElementById("completionScreen");
    if (chatMessages) chatMessages.style.display = "none";
    if (chatInput) chatInput.style.display = "none";
    if (completionScreen) completionScreen.classList.add("active");
  };

  const toggleVoiceRecording = () => {
    if (!recognitionSupported) {
      alert("Voice recognition is not supported in your browser. Please type instead.");
      return;
    }

    if (isRecording) {
      stopVoiceRecording();
    } else {
      startVoiceRecording();
    }
  };

  const startVoiceRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognitionRef.current = recognition;
    setIsRecording(true);

    const input = document.getElementById("messageInput");
    const inputWrapper = document.getElementById("inputWrapper");
    const micIcon = document.getElementById("micIcon");

    if (micIcon) micIcon.classList.add("recording");
    if (inputWrapper) inputWrapper.classList.add("recording");
    if (input) {
      input.placeholder = "Listening...";
      input.value = "";
    }

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      if (input) input.value = transcript;
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      if (input) input.placeholder = "Error - please type instead";
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
      if (micIcon) micIcon.classList.remove("recording");
      if (inputWrapper) inputWrapper.classList.remove("recording");
      if (input) input.placeholder = "Type or use voice...";
    };

    recognition.start();
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
    const micIcon = document.getElementById("micIcon");
    const inputWrapper = document.getElementById("inputWrapper");
    if (micIcon) micIcon.classList.remove("recording");
    if (inputWrapper) inputWrapper.classList.remove("recording");
    const input = document.getElementById("messageInput");
    if (input) input.placeholder = "Type or use voice...";
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Render breadcrumb
  const renderBreadcrumbJSX = () => {
    const sections = [
      { label: "Personal", steps: [0, 1, 2, 3] },
      { label: "Professional", steps: [4, 5] },
      { label: "Expertise", steps: [6] },
      { label: "About You", steps: [7, 8] },
      { label: "Review", steps: [9] },
    ];

    return sections.map((section, idx) => {
      const isCompleted = currentStep > Math.max(...section.steps);
      const isActive = section.steps.includes(currentStep);
      return (
        <React.Fragment key={idx}>
          <div
            className={`signup-teacher-breadcrumb-item ${isActive ? "active" : ""} ${
              isCompleted ? "completed" : ""
            }`}
          >
            <span className="signup-teacher-breadcrumb-step">
              {isCompleted ? <i className="fa-solid fa-check"></i> : idx + 1}
            </span>
            <span>{section.label}</span>
          </div>
          {idx < sections.length - 1 && (
            <div
              className={`signup-teacher-breadcrumb-connector ${isCompleted ? "completed" : ""}`}
            />
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="signup-teacher-bg">
      <div className="signup-teacher-body">
        <div className="signup-teacher-chat-container">
          {/* Header */}
          <div className="signup-teacher-chat-header">
            <div className="signup-teacher-bot-avatar">🤖</div>
            <div className="signup-teacher-header-info">
              <h3>Elderise Teacher Registration</h3>
              <p>Share Your Knowledge & Experience</p>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="signup-teacher-breadcrumb-container">
            <div className="signup-teacher-breadcrumb" id="breadcrumb">
              {renderBreadcrumbJSX()}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="signup-teacher-chat-messages" id="chatMessages" ref={chatMessagesRef}>
            {messages.map((msg) => {
              if (msg.type === "typing") {
                return (
                  <div key={msg.id} className="signup-teacher-message bot">
                    <div className="signup-teacher-message-avatar">🤖</div>
                    <div className="signup-teacher-message-content">
                      <div className="signup-teacher-typing-indicator active">
                        <div className="signup-teacher-typing-dot"></div>
                        <div className="signup-teacher-typing-dot"></div>
                        <div className="signup-teacher-typing-dot"></div>
                      </div>
                    </div>
                  </div>
                );
              }

              if (msg.choices) {
                return (
                  <div key={msg.id} className="signup-teacher-message bot">
                    <div className="signup-teacher-message-avatar">🤖</div>
                    <div className="signup-teacher-message-content">
                      <div className="signup-teacher-quick-replies">
                        {msg.choices.map((choice, i) => (
                          <button
                            key={i}
                            className="signup-teacher-quick-reply-btn"
                            onClick={() => selectChoice(choice)}
                          >
                            {choice}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={msg.id} className={`signup-teacher-message ${msg.sender}`}>
                  <div className="signup-teacher-message-avatar">
                    {msg.sender === "bot" ? "🤖" : <i className="fa-solid fa-user"></i>}
                  </div>
                  <div className="signup-teacher-message-content">
                    <div className="signup-teacher-message-bubble">{msg.text}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Completion Screen */}
          <div className="signup-teacher-completion-screen" id="completionScreen">
            <div className="signup-teacher-completion-icon">
              <i className="fa-solid fa-check"></i>
            </div>
            <h2>Registration Successful! 🎉</h2>
            <p>
              Welcome to the Elderise community!
              <br />
              Your profile is now live and ready to start teaching.
            </p>
            <button
              className="signup-teacher-completion-btn"
              onClick={() => (window.location.href = "/SignIn")}
            >
              <i className="fa-solid fa-home"></i> Go to Sign In
            </button>
          </div>

          {/* Chat Input */}
          <div className="signup-teacher-chat-input" id="chatInput">
            <div className="signup-teacher-input-wrapper" id="inputWrapper">
              <input
                type="text"
                id="messageInput"
                placeholder="Type or use voice..."
                onKeyPress={handleKeyPress}
              />
              <i
                className="fa-solid fa-microphone signup-teacher-input-icon"
                id="micIcon"
                onClick={toggleVoiceRecording}
                title="Click to speak"
              ></i>
            </div>
            <button className="signup-teacher-send-btn" id="sendBtn" onClick={() => sendMessage()}>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupTeacher;