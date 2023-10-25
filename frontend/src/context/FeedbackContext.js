// import { v4 as uuidv4 } from 'uuid';
import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState([]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {}, // the item we clicked on should be populated here
    edit: false,
  });
  useEffect(() => {
    setIsLoading(true);
    fetchFeedback();
    setIsLoading(false);
  }, []);

  // Fetch feedback
  const fetchFeedback = async () => {
    const response = await fetch("/api/feedbacks");
    const data = await response.json();

    setFeedback(data);
  };

  //Add item
  const addFeedback = async (newFeedback) => {
    // newFeedback.id = uuidv4();
    //post req to our backend
    const response = await fetch("/api/feedbacks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();
    setFeedback([data, ...feedback]);
  };

  //Delete item
  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await fetch(`/api/feedbacks/${id}`, { method: "DELETE" });

      const response = await fetch("/api/feedbacks");
      const data = await response.json();

      setFeedback(data);
    }
  };

  // Update feedback item
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/api/feedbacks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updItem),
    });

    const updatedResponse = await fetch("/api/feedbacks");
    const data = await updatedResponse.json();

    setFeedback(data);
  };

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit, // the global state we pass to be edited by editFeedback
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
