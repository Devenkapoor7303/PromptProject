import axios from "axios";
import { NotFoundError } from "../errors/customError.js";
import { StatusCodes } from "http-status-codes";

export const getPromptMessage = async (req, res) => {

    const url = process.env.PROMPT_URL;
    const authToken = process.env.PROMPT_AUTH_TOKEN;

    const headers = {
        'Content-Type': 'application/json',
        'x-auth-token': authToken,
    };

    const promptInfo = req.body;

    console.log(promptInfo);

    const { data } = await axios.post(url, promptInfo, { headers });
    
    if (!data) {
        throw new NotFoundError("No Message Found for this Prompt");
    }
    res.status(StatusCodes.OK).json({
        data
    })

}
