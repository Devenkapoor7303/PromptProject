import { useState } from "react";
import { Grid } from "react-loader-spinner";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

const promptInput = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [promptRes, setPromptRes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      messages: [
        {
          role: "system",
          content: "You are a helpful Assistant.",
        },
        {
          role: "user",
          content: `${prompt}`,
        },
      ],
      model: {
        name: "openai/gpt-4-1106-preview",
      },
      variables: [],
    };
    try {
      setLoading(true);
      const response = await customFetch.post("/prompt", data);
      setLoading(false);
      setPromptRes(response.data.data.responseText);

      return;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

  const renderContent = () => {
    if (!loading && !promptRes) {
      return (
        <>
          <form className="form-row" onSubmit={handleSubmit}>
            <label htmlFor="prompt" className="form-label">
              Enter Your Prompt
            </label>
            <input
              value={prompt}
              type="text"
              id="prompt"
              name="prompt"
              className="form-input"
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button className="form-btn">Submit Prompt</button>
          </form>
        </>
      );
    }
    if (promptRes) {
      return (
        <>
          <h1>Prompt Result</h1>
          <p>{promptRes}</p>
        </>
      );
    }
    return (
      <Grid
        visible={true}
        height="80"
        width="80"
        color="#ffffff"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass="grid-wrapper"
      />
    );
  };

  return renderContent();
};
export default promptInput;
